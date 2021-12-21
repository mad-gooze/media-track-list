import type { TrackProps } from '../Track';
import { Track } from '../Track';
import type { VideoTrack as IVideoTrack } from '../video';

export type VideoTrackProps = Partial<{
    selected: boolean;
    width: number;
    height: number;
    bitrate: number;
    sourceBuffer: SourceBuffer | null;
}>;

/**
 * A representation of a single `VideoTrack`.
 *
 * @see [Spec]{@link https://html.spec.whatwg.org/multipage/embedded-content.html#videotrack}
 */
export class VideoTrack<
        T extends Record<string, unknown> = Record<string, never>,
    >
    extends Track<T>
    implements IVideoTrack, VideoTrackProps
{
    private _selected = false;

    public readonly width?: number;
    public readonly height?: number;
    public readonly bitrate?: number;

    /**
     * @internal
     */
    public onselectedchange: VoidFunction | undefined;

    constructor({
        selected = false,
        width,
        height,
        bitrate,
        ...trackProps
    }: TrackProps<T> & VideoTrackProps = {}) {
        super(trackProps);

        this.selected = selected;

        this.bitrate = bitrate;
        this.width = width;
        this.height = height;
    }

    /**
     * @internal
     */
    public _destroy(): void {
        delete this.onselectedchange;
    }

    /**
     * If this track is the one that is currently playing.
     */
    public get selected(): boolean {
        return this._selected;
    }

    public set selected(newSelected: boolean) {
        // an invalid or unchanged value
        if (
            typeof newSelected !== 'boolean' ||
            newSelected === this._selected
        ) {
            return;
        }
        this._selected = newSelected;

        // An event that fires when selected changes on this track. This allows
        // the VideoTrackList that holds this track to act accordingly.

        // Note: This is not part of the spec! Native tracks will do
        // this internally without an event
        this.onselectedchange?.();
    }
}
