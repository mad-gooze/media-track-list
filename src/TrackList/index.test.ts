import { TrackList } from '.';
import { Track } from '../Track';

class TestTrack extends Track<{}> {
    public _destroy(): void {
        //
    }
}
class TestTrackList extends TrackList<TestTrack> {}

describe(TrackList, () => {
    let tracks;

    beforeEach(() => {
        tracks = [
            new TestTrack({ id: '1' }),
            new TestTrack({ id: '2' }),
            new TestTrack({ id: '3' }),
        ];
    });

    it("TrackList's length is set correctly", () => {
        const trackList = new TestTrackList(tracks);
        expect(trackList.length).toEqual(tracks.length);
    });

    it('can get tracks by int and string id', () => {
        const trackList = new TestTrackList(tracks);

        expect(trackList.getTrackById('1').id).toEqual('1');
        expect(trackList.getTrackById('2').id).toEqual('2');
        expect(trackList.getTrackById('3').id).toEqual('3');
    });

    it('length is updated when new tracks are added or removed', () => {
        const trackList = new TestTrackList(tracks);

        trackList.addTrack(new TestTrack({ id: '100' }));
        expect(trackList.length).toEqual(tracks.length + 1);
        trackList.addTrack(new TestTrack({ id: '101' }));
        expect(trackList.length).toEqual(tracks.length + 2);

        trackList.removeTrack(trackList.getTrackById('101'));
        expect(trackList.length).toEqual(tracks.length + 1);
        trackList.removeTrack(trackList.getTrackById('100'));
        expect(trackList.length).toEqual(tracks.length);
    });

    it('addTrack ignores duplicated tracks', () => {
        const trackList = new TestTrackList();
        trackList.addTrack(tracks[0]);
        trackList.addTrack(tracks[0]);
        expect(trackList.length).toEqual(1);
    });

    it('removeTrack passes through non-used tracks', () => {
        const trackList = new TestTrackList([tracks[0]]);
        trackList.removeTrack(tracks[1]);
        expect(trackList.length).toEqual(1);
    });

    it('can access items by index', () => {
        const trackList = new TestTrackList(tracks);
        for (let i = 0; i < trackList.length; i++) {
            expect(trackList[i].id).toEqual(tracks[i].id);
            expect(trackList.item(i).id).toEqual(tracks[i].id);
        }
    });

    it('can access new items by index', () => {
        const trackList = new TestTrackList(tracks);

        trackList.addTrack(new TestTrack({ id: '100' }));
        expect(trackList[3].id).toEqual('100');

        trackList.addTrack(new TestTrack({ id: '101' }));
        expect(trackList[4].id).toEqual('101');
    });

    it('cannot access removed items by index', () => {
        const trackList = new TestTrackList(tracks);

        trackList.addTrack(new TestTrack({ id: '100' }));
        trackList.addTrack(new TestTrack({ id: '101' }));
        expect(trackList[3].id).toEqual('100');
        expect(trackList[4].id).toEqual('101');

        trackList.removeTrack(trackList.getTrackById('101'));
        trackList.removeTrack(trackList.getTrackById('100'));

        expect(trackList[3]).toBeUndefined();
        expect(trackList[4]).toBeUndefined();
    });

    it('new item available at old index', () => {
        const trackList = new TestTrackList(tracks);

        trackList.addTrack(new TestTrack({ id: '100' }));
        expect(trackList[3].id).toEqual('100');

        trackList.removeTrack(trackList.getTrackById('100'));
        expect(trackList[3]).toBeUndefined();

        trackList.addTrack(new TestTrack({ id: '101' }));
        expect(trackList[3].id).toEqual('101');
    });

    it('getTrackById() returns null for non-existing track', () => {
        const trackList = new TestTrackList();
        expect(trackList.getTrackById('foobar')).toEqual(null);
    });

    //   it('a "addtrack" event is triggered when new tracks are added', () => {
    //     const trackList = new TestTrackList(tracks);

    //     let tracks = 0;
    //     let adds = 0;
    //     const addHandler = (e) => {
    //       if (e.track) {
    //         tracks++;
    //       }
    //       adds++;
    //     };

    //     trackList.addEventListener('addtrack', addHandler);

    //     trackList.addTrack(new TestTrack({ id: '100'}));
    //     trackList.addTrack(new TestTrack({ id: '101'}));

    //     trackList.off('addtrack', addHandler);
    //     trackList.onaddtrack = addHandler;

    //     trackList.addTrack(newTrack('102'));
    //     trackList.addTrack(newTrack('103'));

    //     expect(adds, 4, 'we got ' + adds + ' "addtrack" events');
    //     expect(tracks, 4, 'we got a track with every event');
    //   });

    //   it('a "removetrack" event is triggered when tracks are removed', () => {
    //     const trackList = new TestTrackList(tracks);
    //     let tracks = 0;
    //     let rms = 0;
    //     const rmHandler = (e) => {
    //       if (e.track) {
    //         tracks++;
    //       }
    //       rms++;
    //     };

    //     trackList.addEventListener('removetrack', rmHandler);
    //     trackList.removeTrack(trackList.getTrackById('1'));
    //     trackList.removeTrack(trackList.getTrackById('2'));

    //     trackList.removeEventListener('removetrack', rmHandler);
    //     trackList.onremovetrack = rmHandler;
    //     trackList.removeTrack(trackList.getTrackById('3'));

    //     expect(rms, 3, 'we got ' + rms + ' "removetrack" events');
    //     expect(tracks, 3, 'we got a track with every event');
    //   });
});
