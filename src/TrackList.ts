import { Track } from './Track';

export interface CustomTrackEvent<T extends Track> extends Event {
    track: T | null;
}

/**
 * Common functionality between AudioTrackList and VideoTrackList
 */
export abstract class TrackList<T extends Track>
    extends EventTarget
    implements ArrayLike<T>
{
    readonly [n: number]: T;

    private tracks: T[] = [];
    protected _changing = false;

    constructor(tracks: ReadonlyArray<T> = []) {
        super();
        for (let i = 0; i < tracks.length; i++) {
            this.addTrack(tracks[i]);
        }
    }

    /**
     * The current number of `Track`s in the this TrackList.
     */
    public get length(): number {
        return this.tracks.length;
    }

    /**
     * Add a {@link Track} to the `TrackList`
     *
     * @param track track to add to the list.
     *
     * @internal
     */
    public addTrack(track: T): void {
        // Do not add duplicate tracks
        if (this.tracks.indexOf(track) !== -1) {
            return;
        }

        // add index getter
        const index = this.tracks.length;
        Object.defineProperty(this, index, {
            get: () => this.tracks[index],
            enumerable: false,
            configurable: true,
        });

        this.tracks.push(track);
        this.dispatchTrackEvent('addtrack', track);
    }

    /**
     * Remove a {@link Track} from the `TrackList`
     * @param track to remove from the list.
     *
     * @internal
     */
    public removeTrack(track: T) {
        const index = this.tracks.indexOf(track);
        if (index === -1) {
            return;
        }

        track._destroy?.();

        // remove index getter
        const getterIndex = this.tracks.length - 1;
        if (String(getterIndex) in this) {
            Object.defineProperty(this, getterIndex, {
                get: undefined,
                enumerable: false,
                configurable: true,
            });
        }

        this.tracks.splice(index, 1);
        this.dispatchTrackEvent('removetrack', track);
    }

    /**
     * Get a Track from the TrackList by a tracks id
     * @param id - the id of the track to get
     */
    public getTrackById(id: string): T | null {
        return this.tracks.find((track) => track.id === id) || null;
    }

    /**
     * Returns a track by it's index
     */
    public item(index: number): T {
        return this.tracks[index];
    }

    /**
     * @internal
     */
    protected dispatchTrackEvent(eventName: string, track: T): void {
        const ev = new Event(eventName) as CustomTrackEvent<T>;
        ev.track = track || null;
        this.dispatchEvent(ev);
    }
}
