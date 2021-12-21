import { VideoTrack } from '.';

describe(VideoTrack, () => {
    it('can create an VideoTrack a selected property', () => {
        const track = new VideoTrack({ selected: true });
        expect(track.selected).toEqual(true);
    });

    it('defaults when items not provided', () => {
        const track = new VideoTrack();

        expect(track.kind).toEqual('');
        expect(track.selected).toEqual(false);
        expect(track.label).toEqual('');
        expect(track.language).toEqual('');
        expect(track.sourceBuffer).toEqual(null);
        expect(track.id.length).toBeGreaterThan(0);

        const otherTrack = new VideoTrack();
        expect(track.id).not.toEqual(otherTrack.id);
    });

    it('custom props', () => {
        const track = new VideoTrack({
            width: 1920,
            height: 1080,
            bitrate: 100500,
            props: { metadata: 'foobar' },
        });

        expect(track.width).toEqual(1920);
        expect(track.height).toEqual(1080);
        expect(track.props!.metadata).toEqual('foobar');
    });

    it('when selected is changed onselectedchange is called', () => {
        const track = new VideoTrack({ selected: false });
        track.onselectedchange = jest.fn();

        // two events
        track.selected = true;
        track.selected = false;
        expect(track.onselectedchange).toBeCalledTimes(2);

        // no event here
        track.selected = false;
        track.selected = false;
        expect(track.onselectedchange).toBeCalledTimes(2);

        // one event
        track.selected = true;
        expect(track.onselectedchange).toBeCalledTimes(3);
    });
});
