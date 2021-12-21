import { util } from 'prettier';
import { VideoTrackList } from '.';
import { VideoTrack } from '../VideoTrack';

describe(VideoTrackList, () => {
    it('trigger "change" when "selectedchange" is fired on a track', () => {
        const track = new VideoTrack();
        const videoTrackList = new VideoTrackList([track]);

        const onChange = jest.fn();
        videoTrackList.addEventListener('change', onChange);

        track.onselectedchange?.();
        expect(onChange).toBeCalledTimes(1);

        videoTrackList.removeEventListener('change', onChange);
        videoTrackList.onchange = onChange;

        track.onselectedchange?.();
        expect(onChange).toBeCalledTimes(2);

        videoTrackList.removeTrack(track);
        videoTrackList.onchange = null;
    });

    it('only one track is ever selected', () => {
        const tracks = [
            new VideoTrack({ selected: true }),
            new VideoTrack({ selected: true }),
            new VideoTrack({ selected: true }),
            new VideoTrack(),
        ];
        const list = new VideoTrackList([tracks[0], tracks[1]]);

        expect(tracks[0].selected).toBeFalsy();
        expect(tracks[1].selected).toBeTruthy();
        expect(list.selectedIndex).toEqual(1);

        tracks[0].selected = true;
        expect(tracks[0].selected).toBeTruthy();
        expect(list.selectedIndex).toEqual(0);
        expect(tracks[1].selected).toBeFalsy();

        list.addTrack(tracks[2]);
        expect(tracks[0].selected).toBeFalsy();
        expect(tracks[1].selected).toBeFalsy();
        expect(tracks[2].selected).toBeTruthy();
        expect(list.selectedIndex).toEqual(2);

        tracks[1].selected = true;
        expect(tracks[0].selected).toBeFalsy();
        expect(tracks[1].selected).toBeTruthy();
        expect(list.selectedIndex).toEqual(1);
        expect(tracks[2].selected).toBeFalsy();

        list.addTrack(tracks[3]);
        expect(tracks[0].selected).toBeFalsy();
        expect(tracks[1].selected).toBeTruthy();
        expect(list.selectedIndex).toEqual(1);
        expect(tracks[2].selected).toBeFalsy();
        expect(tracks[3].selected).toBeFalsy();

        list.removeTrack(tracks[0]);
        list.removeTrack(tracks[1]);
        list.removeTrack(tracks[2]);
        list.removeTrack(tracks[3]);
    });

    it('all tracks can be unselected', () => {
        const tracks = [
            new VideoTrack(),
            new VideoTrack(),
        ];
        const list = new VideoTrackList([tracks[0], tracks[1]]);

        expect(tracks[0].selected).toBeFalsy();
        expect(tracks[1].selected).toBeFalsy();
        expect(list.selectedIndex).toEqual(-1);

        tracks[0].selected = true;
        expect(tracks[0].selected).toBeTruthy();
        expect(list.selectedIndex).toEqual(0);
        expect(tracks[1].selected).toBeFalsy();

        tracks[0].selected = false;
        expect(tracks[0].selected).toBeFalsy();
        expect(tracks[1].selected).toBeFalsy();
        expect(list.selectedIndex).toEqual(-1);

        list.removeTrack(tracks[0]);
        list.removeTrack(tracks[1]);
    });

    it('trigger a change event per selected change', () => {
        const tracks = [
            new VideoTrack({ selected: true }),
            new VideoTrack({ selected: true }),
            new VideoTrack({ selected: true }),
            new VideoTrack(),
        ]
        const list = new VideoTrackList([tracks[0], tracks[1]]);

        let change = 0;
        const onChange = () => change++;

        list.addEventListener('change', onChange);
        tracks[0].selected = true;
        expect(change).toEqual(1);
        expect(change).toEqual(1);

        list.addTrack(tracks[2]);
        expect(change).toEqual(2);

        tracks[0].selected = true;
        expect(change).toEqual(3);

        tracks[0].selected = false;
        expect(change).toEqual(4);

        list.addTrack(tracks[3]);
        expect(change).toEqual(4);

        list.removeTrack(tracks[0]);
        list.removeTrack(tracks[1]);
        list.removeTrack(tracks[2]);
        list.removeTrack(tracks[3]);
        list.removeEventListener('change', onChange);
    });
});
