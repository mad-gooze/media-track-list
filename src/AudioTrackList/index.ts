import { AudioTrack } from '../AudioTrack';
import { TrackList } from '../TrackList';
import type {
    AudioTrackEvent,
    AudioTrackList as IAudioTrackList,
    AudioTrackListEventMap,
} from '../video';

/**
 * Anywhere we call this function we diverge from the spec
 * as we only support one enabled audio track at a time
 *
 * @param list list to work on
 * @param track The track to skip
 */
function disableOthers<T extends Record<string, unknown>>(
    list: ArrayLike<AudioTrack<T>>,
    track: AudioTrack<T>,
): void {
    for (let i = 0; i < list.length; i++) {
        if (track.id === list[i].id) {
            continue;
        }
        // another audio track is enabled, disable it
        list[i].enabled = false;
    }
}

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * The current list of {@link AudioTrack} for a media file.
 *
 * @see [Spec]{@link https://html.spec.whatwg.org/multipage/embedded-content.html#audiotracklist}
 */
export class AudioTrackList<
        T extends Record<string, unknown> = Record<string, never>,
    >
    extends TrackList<AudioTrack<T>, T>
    implements IAudioTrackList
{
    public onaddtrack:
        | ((this: IAudioTrackList, ev: AudioTrackEvent) => any)
        | null;
    public onchange: ((this: IAudioTrackList, ev: Event) => any) | null;
    public onremovetrack:
        | ((this: IAudioTrackList, ev: AudioTrackEvent) => any)
        | null;

    constructor(tracks: ReadonlyArray<AudioTrack<T>> = []) {
        // make sure only 1 track is enabled
        // sorted from last index to first index
        for (let i = tracks.length - 1; i >= 0; i--) {
            if (tracks[i].enabled) {
                disableOthers(tracks, tracks[i]);
                break;
            }
        }
        super(tracks);

        this.onaddtrack = null;
        this.onchange = null;
        this.onremovetrack = null;

        this.addEventListener('change', (e) => this.onchange?.(e));
        this.addEventListener('addtrack', (e) => this.onaddtrack?.(e));
        this.addEventListener('removetrack', (e) => this.onremovetrack?.(e));
    }

    /**
     * Add an {@link AudioTrack} to the `AudioTrackList`.
     *
     * @param track The AudioTrack to add to the list
     */
    public addTrack(track: AudioTrack<T>): void {
        if (track.enabled) {
            disableOthers(this, track);
        }

        super.addTrack(track);

        track.onenabledchange = () => {
            // when we are disabling other tracks (since we don't support
            // more than one track at a time) we will set changing
            // to true so that we don't trigger additional change events
            if (this._changing) {
                return;
            }
            this._changing = true;
            disableOthers(this, track);
            this._changing = false;
            this.dispatchEvent(new Event('change'));
        };
    }

    public addEventListener<K extends keyof AudioTrackListEventMap>(
        type: K,
        listener: (this: AudioTrackList, ev: AudioTrackListEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions,
    ): void;
    public addEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions,
    ): void;
    public addEventListener<K extends keyof AudioTrackListEventMap>(
        type: K | string,
        listener: (
            this: AudioTrackList,
            ev: AudioTrackListEventMap[K],
        ) => any | EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions,
    ): void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        super.addEventListener(type, listener, options);
    }

    public removeEventListener<K extends keyof AudioTrackListEventMap>(
        type: K,
        listener: (this: AudioTrackList, ev: AudioTrackListEventMap[K]) => any,
        options?: boolean | EventListenerOptions,
    ): void;
    public removeEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | EventListenerOptions,
    ): void;
    public removeEventListener<K extends keyof AudioTrackListEventMap>(
        type: K | string,
        listener: (
            this: AudioTrackList,
            ev: AudioTrackListEventMap[K],
        ) => any | EventListenerOrEventListenerObject,
        options?: boolean | EventListenerOptions,
    ): void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        super.removeEventListener(type, listener, options);
    }
}
