import { util } from 'prettier';
import { VideoTrackList } from '.';
import { VideoTrack } from '../VideoTrack';

describe(VideoTrackList, () => {
    let list: VideoTrackList;

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
        list = new VideoTrackList([tracks[0], tracks[1]]);

        expect(tracks[0].selected).toEqual(false);
        expect(tracks[1].selected).toEqual(true);
        expect(list.selectedIndex).toEqual(1);

        tracks[0].selected = true;
        expect(tracks[0].selected).toEqual(true);
        expect(list.selectedIndex).toEqual(0);
        expect(tracks[1].selected).toEqual(false);

        list.addTrack(tracks[2]);
        expect(tracks[0].selected).toEqual(false);
        expect(tracks[1].selected).toEqual(false);
        expect(tracks[2].selected).toEqual(true);
        expect(list.selectedIndex).toEqual(2);

        tracks[1].selected = true;
        expect(tracks[0].selected).toEqual(false);
        expect(tracks[1].selected).toEqual(true);
        expect(list.selectedIndex).toEqual(1);
        expect(tracks[2].selected).toEqual(false);

        list.addTrack(tracks[3]);
        expect(tracks[0].selected).toEqual(false);
        expect(tracks[1].selected).toEqual(true);
        expect(list.selectedIndex).toEqual(1);
        expect(tracks[2].selected).toEqual(false);
        expect(tracks[3].selected).toEqual(false);

        list.removeTrack(tracks[0]);
        list.removeTrack(tracks[1]);
        list.removeTrack(tracks[2]);
        list.removeTrack(tracks[3]);
    });

    it('all tracks can be unselected', () => {
        const tracks = [new VideoTrack(), new VideoTrack()];
        list = new VideoTrackList([tracks[0], tracks[1]]);

        expect(tracks[0].selected).toEqual(false);
        expect(tracks[1].selected).toEqual(false);
        expect(list.selectedIndex).toEqual(-1);

        tracks[0].selected = true;
        expect(tracks[0].selected).toEqual(true);
        expect(list.selectedIndex).toEqual(0);
        expect(tracks[1].selected).toEqual(false);

        tracks[0].selected = false;
        expect(tracks[0].selected).toEqual(false);
        expect(tracks[1].selected).toEqual(false);
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
        ];
        list = new VideoTrackList([tracks[0], tracks[1]]);

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

    it('triggers addtrack and removetrack events', () => {
        list = new VideoTrackList();
        const track = new VideoTrack();

        const onAddTrack = jest.fn();
        const onAddTrackInline = jest.fn();
        const onRemoveTrack = jest.fn();
        const onRemoveTrackInline = jest.fn();

        list.addEventListener('addtrack', onAddTrack);
        list.onaddtrack = onAddTrackInline;

        list.addEventListener('removetrack', onRemoveTrack);
        list.onremovetrack = onRemoveTrackInline;

        // addtrack
        list.addTrack(track);

        expect(onAddTrackInline).toBeCalledTimes(1);
        expect(onAddTrackInline).lastCalledWith(expect.objectContaining({ track }));
        expect(onAddTrackInline).toHaveBeenCalledBefore(onAddTrack);

        expect(onAddTrack).toBeCalledTimes(1);
        expect(onAddTrack).lastCalledWith(expect.objectContaining({ track }));

        // removetrack
        list.removeTrack(track);

        expect(onRemoveTrackInline).toBeCalledTimes(1);
        expect(onRemoveTrackInline).lastCalledWith(expect.objectContaining({ track }));

        expect(onRemoveTrackInline).toHaveBeenCalledBefore(onRemoveTrack);
        expect(onRemoveTrack).toBeCalledTimes(1);
    });
});
