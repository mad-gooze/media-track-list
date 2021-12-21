import { Track } from '../Track';
import { TrackList } from '../TrackList';

export function clearTrackList<
    T extends Track<P>,
    P extends Record<string, unknown> = Record<string, never>,
>(
    trackList:
        | (ArrayLike<T> & Pick<TrackList<T, P>, 'removeTrack'>)
        | undefined,
): void {
    if (trackList === undefined) {
        return;
    }

    while (trackList.length > 0) {
        trackList.removeTrack(trackList[0]);
    }
}
