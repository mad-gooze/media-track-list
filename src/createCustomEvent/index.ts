export function createCustomEvent<T>(type: string, eventInitDict: CustomEventInit<T> = { bubbles: false, cancelable: false, detail: undefined }): CustomEvent<T> {
    if (typeof CustomEvent === 'function') {
        return new CustomEvent(type, eventInitDict);
    }

    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(type, eventInitDict.bubbles, eventInitDict.cancelable, eventInitDict.detail);
    return evt;
}