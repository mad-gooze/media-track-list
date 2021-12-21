import { AudioTrack } from '.';

describe(AudioTrack, () => {
    it('can create an AudioTrack a enabled property', () => {
        const track = new AudioTrack({ enabled: true });
        expect(track.enabled).toEqual(true);
    });

    it('defaults when items not provided', () => {
        const track = new AudioTrack();

        expect(track.kind).toEqual('');
        expect(track.enabled).toEqual(false);
        expect(track.label).toEqual('');
        expect(track.language).toEqual('');
        expect(track.sourceBuffer).toEqual(null);
        expect(track.id.length).toBeGreaterThan(0);

        const otherTrack = new AudioTrack();
        expect(track.id).not.toEqual(otherTrack.id);
    });

    it('when enabled is changed onenabledchange is called', () => {
        const track = new AudioTrack({ enabled: false });
        track.onenabledchange = jest.fn();

        // two events
        track.enabled = true;
        track.enabled = false;
        expect(track.onenabledchange).toBeCalledTimes(2);

        // no event here
        track.enabled = false;
        track.enabled = false;
        expect(track.onenabledchange).toBeCalledTimes(2);

        // one event
        track.enabled = true;
        expect(track.onenabledchange).toBeCalledTimes(3);
    });
});
