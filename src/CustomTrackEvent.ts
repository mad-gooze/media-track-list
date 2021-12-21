import { Track } from './Track';

export interface CustomTrackEvent<
    T extends Track<P>,
    P extends Record<string, unknown> = Record<string, never>,
> extends Event {
    track: T | null;
}
