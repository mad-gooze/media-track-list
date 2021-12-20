import { Track } from '../Track';
import { TrackList } from '../TrackList';

export function clearTrackList<T extends Track>(
    trackList: TrackList<T> | undefined,
): void {
    if (trackList === undefined) {
        return;
    }

    while (trackList.length > 0) {
        trackList.removeTrack(trackList[0]);
    }
}
