import { AudioTrackList } from ".";
import { AudioTrack } from "../AudioTrack";

describe(AudioTrackList, () => {
    let list: AudioTrackList;

    it('trigger "change" when "enabledchange" is fired on a track', () => {
        const track = new AudioTrack();
        list = new AudioTrackList([track]);
        const onChange = jest.fn();

        list.addEventListener('change', onChange);
        track.onenabledchange?.();
        expect(onChange).toBeCalledTimes(1);

        list.removeEventListener('change', onChange);
        list.onchange = onChange;

        track.onenabledchange?.();
        expect(onChange).toBeCalledTimes(2);
    });

    it('only one track is ever enabled', () => {
        const tracks = [
            new AudioTrack({ enabled: true }),
            new AudioTrack({ enabled: true }),
            new AudioTrack({ enabled: true }),
            new AudioTrack(),
        ];
        list = new AudioTrackList([tracks[0], tracks[1]]);

        expect(tracks[0].enabled).toBeFalsy();
        expect(tracks[1].enabled).toBeTruthy();

        tracks[0].enabled = true;
        expect(tracks[0].enabled).toBeTruthy();
        expect(tracks[1].enabled).toBeFalsy();

        list.addTrack(tracks[2]);
        expect(tracks[0].enabled).toBeFalsy();
        expect(tracks[1].enabled).toBeFalsy();
        expect(tracks[2].enabled).toBeTruthy();

        tracks[1].enabled = true;
        expect(tracks[0].enabled).toBeFalsy();
        expect(tracks[1].enabled).toBeTruthy();
        expect(tracks[2].enabled).toBeFalsy();

        list.addTrack(tracks[3]);
        expect(tracks[0].enabled).toBeFalsy();
        expect(tracks[1].enabled).toBeTruthy();
        expect(tracks[2].enabled).toBeFalsy();
        expect(tracks[3].enabled).toBeFalsy();
    });

    it('all tracks can be disabled', () => {
        const tracks = [
            new AudioTrack(),
            new AudioTrack(),
        ];

        list = new AudioTrackList([tracks[0], tracks[1]]);

        expect(tracks[0].enabled).toBeFalsy();
        expect(tracks[1].enabled).toBeFalsy();

        tracks[0].enabled = true;
        expect(tracks[0].enabled).toBeTruthy();
        expect(tracks[1].enabled).toBeFalsy();

        tracks[0].enabled = false;
        expect(tracks[0].enabled).toBeFalsy();
        expect(tracks[1].enabled).toBeFalsy();
    });

    it('trigger a change event per enabled change', () => {
        const tracks = [
            new AudioTrack({ enabled: true }),
            new AudioTrack({ enabled: true }),
            new AudioTrack({ enabled: true }),
            new AudioTrack(),
        ];
        list = new AudioTrackList([tracks[0], tracks[1]]);
        const onChange = jest.fn()

        list.addEventListener('change', onChange);
        tracks[0].enabled = true;
        expect(onChange).toBeCalledTimes(1);

        list.addTrack(tracks[2]);
        expect(onChange).toBeCalledTimes(2);

        tracks[0].enabled = true;
        expect(onChange).toBeCalledTimes(3);

        tracks[0].enabled = false;
        expect(onChange).toBeCalledTimes(4);

        list.addTrack(tracks[3]);
        expect(onChange).toBeCalledTimes(4);
    });
});
