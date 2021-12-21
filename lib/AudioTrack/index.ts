import type { TrackProps } from '../Track';
import { Track } from '../Track';
import type { AudioTrack as IAudioTrack } from '../video';

export type AudioTrackProps = { enabled?: boolean };

/**
 * A representation of a single `AudioTrack`. If it is part of an {@link AudioTrackList}
 * only one `AudioTrack` in the list will be enabled at a time.
 *
 * @see [Spec]{@link https://html.spec.whatwg.org/multipage/embedded-content.html#audiotrack}
 */
export class AudioTrack<
        T extends Record<string, unknown> = Record<string, never>,
    >
    extends Track<T>
    implements IAudioTrack, AudioTrackProps
{
    private _enabled = false;
    /**
     * @internal
     */
    public onenabledchange: VoidFunction | undefined;

    constructor({
        enabled = false,
        ...trackProps
    }: TrackProps<T> & AudioTrackProps = {}) {
        super(trackProps);
        this._enabled = enabled;
    }

    /**
     * @internal
     */
    public _destroy(): void {
        delete this.onenabledchange;
    }

    /**
     * If this `AudioTrack` is enabled or not
     */
    public get enabled(): boolean {
        return this._enabled;
    }

    /**
     * When setting this will fire 'enabledchange' event if the state of enabled is changed.
     */
    public set enabled(newEnabled: boolean) {
        // an invalid or unchanged value
        if (typeof newEnabled !== 'boolean' || newEnabled === this._enabled) {
            return;
        }
        this._enabled = newEnabled;

        // An event that fires when enabled changes on this track. This allows
        // the AudioTrackList that holds this track to act accordingly.

        // Note: This is not part of the spec! Native tracks will do
        // this internally without an event.
        this.onenabledchange?.();
    }
}
