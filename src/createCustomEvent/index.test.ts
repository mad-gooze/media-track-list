import { createCustomEvent } from ".";

const CustomEvent = global.CustomEvent;

describe(createCustomEvent, () => {
    afterEach(() => {
        global.CustomEvent = CustomEvent;
    });

    it('uses global constructor', () => {
        const event = createCustomEvent('foobar');
        expect(event.type).toEqual('foobar');
    });

    it('falls back to initCustomEvent', () => {
        global.CustomEvent = undefined;

        const event = createCustomEvent('foobar', { bubbles: true });
        expect(event.type).toEqual('foobar');
        expect(event.bubbles).toEqual(true);
    });
});
