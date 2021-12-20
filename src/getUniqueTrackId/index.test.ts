import { getUniqueTrackId } from ".";

describe(getUniqueTrackId, () => {
    it('returns unique track id\'s', () => {
        expect(getUniqueTrackId() !== getUniqueTrackId()).toBeTruthy();
    });
});
