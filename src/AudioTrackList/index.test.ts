import { AudioTrackList } from '.';
import { AudioTrack } from '../AudioTrack';
import 'jest-extended';


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

        expect(tracks[0].enabled).toEqual(false);
        expect(tracks[1].enabled).toEqual(true);

        tracks[0].enabled = true;
        expect(tracks[0].enabled).toEqual(true);
        expect(tracks[1].enabled).toEqual(false);

        list.addTrack(tracks[2]);
        expect(tracks[0].enabled).toEqual(false);
        expect(tracks[1].enabled).toEqual(false);
        expect(tracks[2].enabled).toEqual(true);

        tracks[1].enabled = true;
        expect(tracks[0].enabled).toEqual(false);
        expect(tracks[1].enabled).toEqual(true);
        expect(tracks[2].enabled).toEqual(false);

        list.addTrack(tracks[3]);
        expect(tracks[0].enabled).toEqual(false);
        expect(tracks[1].enabled).toEqual(true);
        expect(tracks[2].enabled).toEqual(false);
        expect(tracks[3].enabled).toEqual(false);
    });

    it('all tracks can be disabled', () => {
        const tracks = [new AudioTrack(), new AudioTrack()];

        list = new AudioTrackList([tracks[0], tracks[1]]);

        expect(tracks[0].enabled).toEqual(false);
        expect(tracks[1].enabled).toEqual(false);

        tracks[0].enabled = true;
        expect(tracks[0].enabled).toEqual(true);
        expect(tracks[1].enabled).toEqual(false);

        tracks[0].enabled = false;
        expect(tracks[0].enabled).toEqual(false);
        expect(tracks[1].enabled).toEqual(false);
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

    it('triggers addtrack and removetrack events', () => {
        list = new AudioTrackList();
        const track = new AudioTrack();

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
        expect(onRemoveTrack).lastCalledWith(expect.objectContaining({ track }));
    });
});
