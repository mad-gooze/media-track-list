import { clearTrackList } from '.';
import { VideoTrack } from '../VideoTrack';

describe(clearTrackList, () => {
    it('accepts undefined', () => {
        clearTrackList(undefined);
    });

    it('removes all tracks', () => {
        let length = 3;
        const TEST_TRACK_LIST = {
            get length() {
                return length;
            },
            0: new VideoTrack(),
            1: new VideoTrack(),
            2: new VideoTrack(),
            removeTrack: (track: VideoTrack) => {
                const trackIndex = Array.from(TEST_TRACK_LIST).indexOf(track);
                if (trackIndex === -1) {
                    throw new Error('Invalid track');
                }
                // @ts-ignore
                delete TEST_TRACK_LIST[trackIndex];
                length--;
            },
        };

        clearTrackList(TEST_TRACK_LIST);
        expect(TEST_TRACK_LIST.length).toEqual(0);
    });
});
