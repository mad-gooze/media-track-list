import { Track } from './Track';

export interface CustomTrackEvent<T extends Track<K>, K = {}> extends Event {
    track: T | null;
}
