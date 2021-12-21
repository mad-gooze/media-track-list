import { TrackList } from '../TrackList';
import type { VideoTrack } from '../VideoTrack';
import type {
    VideoTrackEvent,
    VideoTrackList as IVideoTrackList,
    VideoTrackListEventMap,
} from '../video';
import { createCustomEvent } from '../createCustomEvent';

/**
 * Un-select all other {@link VideoTrack}s that are selected.
 *
 * @param list list to work on
 *
 * @param track The track to skip
 */
function disableOthers<T extends Record<string, unknown>>(
    list: ArrayLike<VideoTrack<T>>,
    track: VideoTrack<T>,
): void {
    for (let i = 0; i < list.length; i++) {
        if (!Object.keys(list[i]).length || track.id === list[i].id) {
            continue;
        }
        // another video track is enabled, disable it
        list[i].selected = false;
    }
}

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * The current list of {@link VideoTrack} for a video.
 *
 * @see [Spec]{@link https://html.spec.whatwg.org/multipage/embedded-content.html#videotracklist}
 */
export class VideoTrackList<
        T extends Record<string, unknown> = Record<string, never>,
    >
    extends TrackList<VideoTrack<T>, T>
    implements IVideoTrackList
{
    public onaddtrack:
        | ((this: IVideoTrackList, ev: VideoTrackEvent) => any)
        | null;
    public onchange: ((this: IVideoTrackList, ev: Event) => any) | null;
    public onremovetrack:
        | ((this: IVideoTrackList, ev: VideoTrackEvent) => any)
        | null;

    constructor(tracks: ReadonlyArray<VideoTrack<T>> = []) {
        // make sure only 1 track is enabled
        // sorted from last index to first index
        for (let i = tracks.length - 1; i >= 0; i--) {
            if (tracks[i].selected) {
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

    public addEventListener<K extends keyof VideoTrackListEventMap>(
        type: K,
        listener: (this: VideoTrackList, ev: VideoTrackListEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions,
    ): void;
    public addEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions,
    ): void;
    public addEventListener<K extends keyof VideoTrackListEventMap>(
        type: K | string,
        listener: (
            this: VideoTrackList,
            ev: VideoTrackListEventMap[K],
        ) => any | EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions,
    ): void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        super.addEventListener(type, listener, options);
    }

    public removeEventListener<K extends keyof VideoTrackListEventMap>(
        type: K,
        listener: (this: VideoTrackList, ev: VideoTrackListEventMap[K]) => any,
        options?: boolean | EventListenerOptions,
    ): void;
    public removeEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | EventListenerOptions,
    ): void;
    public removeEventListener<K extends keyof VideoTrackListEventMap>(
        type: K | string,
        listener: (
            this: VideoTrackList,
            ev: VideoTrackListEventMap[K],
        ) => any | EventListenerOrEventListenerObject,
        options?: boolean | EventListenerOptions,
    ): void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        super.removeEventListener(type, listener, options);
    }

    public get selectedIndex(): number {
        for (let i = 0; i < this.length; i++) {
            if (this[i].selected) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Add a {@link VideoTrack} to the `VideoTrackList`.
     *
     * @param track The VideoTrack to add to the list
     */
    addTrack(track: VideoTrack<T>): void {
        if (track.selected) {
            disableOthers(this, track);
        }

        super.addTrack(track);

        track.onselectedchange = () => {
            if (this._changing) {
                return;
            }
            this._changing = true;
            disableOthers(this, track);
            this._changing = false;
            this.dispatchEvent(createCustomEvent('change'));
        };
    }
}
