import type { Track } from '../Track';
import type { TrackList } from '../TrackList';

/**
 * Removes all tracks from passed TrackList
 */
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
