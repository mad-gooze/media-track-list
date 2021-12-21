// copied from typescript@3.8.3/lib/lib.dom.d.ts
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface HTMLMediaElement extends HTMLElement {
    /**
     * Returns an AudioTrackList object with the audio tracks for a given video element.
     */
    readonly audioTracks: AudioTrackList;
    readonly videoTracks: VideoTrackList;
}

/** A single video track from a <video> element. */
export interface VideoTrack {
    readonly id: string;
    kind: string;
    readonly label: string;
    language: string;
    selected: boolean;
    readonly sourceBuffer: SourceBuffer | null;
}

export interface VideoTrackListEventMap {
    addtrack: VideoTrackEvent;
    change: Event;
    removetrack: VideoTrackEvent;
}

/** Used to represent a list of the video tracks contained within a <video> element, with each track represented by a separate VideoTrack object in the list. */
export interface VideoTrackList extends EventTarget {
    readonly length: number;
    onaddtrack: ((this: VideoTrackList, ev: VideoTrackEvent) => any) | null;
    onchange: ((this: VideoTrackList, ev: Event) => any) | null;
    onremovetrack: ((this: VideoTrackList, ev: VideoTrackEvent) => any) | null;
    readonly selectedIndex: number;
    getTrackById(id: string): VideoTrack | null;
    item(index: number): VideoTrack;
    addEventListener<K extends keyof VideoTrackListEventMap>(
        type: K,
        listener: (this: VideoTrackList, ev: VideoTrackListEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions,
    ): void;
    addEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions,
    ): void;
    removeEventListener<K extends keyof VideoTrackListEventMap>(
        type: K,
        listener: (this: VideoTrackList, ev: VideoTrackListEventMap[K]) => any,
        options?: boolean | EventListenerOptions,
    ): void;
    removeEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | EventListenerOptions,
    ): void;
    [index: number]: VideoTrack;
}

/** A single audio track from one of the HTML media elements, <audio> or <video>.  */
export interface AudioTrack {
    enabled: boolean;
    readonly id: string;
    kind: string;
    readonly label: string;
    language: string;
    readonly sourceBuffer: SourceBuffer | null;
}

export interface AudioTrackListEventMap {
    addtrack: AudioTrackEvent;
    change: Event;
    removetrack: AudioTrackEvent;
}

/** Used to represent a list of the audio tracks contained within a given HTML media element, with each track represented by a separate AudioTrack object in the list. */
export interface AudioTrackList extends EventTarget {
    readonly length: number;
    onaddtrack: ((this: AudioTrackList, ev: AudioTrackEvent) => any) | null;
    onchange: ((this: AudioTrackList, ev: Event) => any) | null;
    onremovetrack: ((this: AudioTrackList, ev: AudioTrackEvent) => any) | null;
    getTrackById(id: string): AudioTrack | null;
    item(index: number): AudioTrack;
    addEventListener<K extends keyof AudioTrackListEventMap>(
        type: K,
        listener: (this: AudioTrackList, ev: AudioTrackListEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions,
    ): void;
    addEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions,
    ): void;
    removeEventListener<K extends keyof AudioTrackListEventMap>(
        type: K,
        listener: (this: AudioTrackList, ev: AudioTrackListEventMap[K]) => any,
        options?: boolean | EventListenerOptions,
    ): void;
    removeEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | EventListenerOptions,
    ): void;
    [index: number]: AudioTrack;
}

/** The TrackEvent export interface, part of the HTML DOM specification, is used for events which represent changes to the set of available tracks on an HTML media element; these events are addtrack and removetrack. */
export interface HTMLVideoElementTrackEvent extends Event {
    track: VideoTrack | AudioTrack | TextTrack | null;
}

export interface VideoTrackEvent extends Event {
    track: VideoTrack | null;
}

export interface AudioTrackEvent extends Event {
    track: AudioTrack | null;
}

/** TextTrackCues represent a string of text that will be displayed for some duration of time on a TextTrack. This includes the start and end times that the cue will be displayed. A TextTrackCue cannot be used directly, instead one of the derived types (e.g. VTTCue) must be used. */
export interface TextTrackCue extends EventTarget {
    endTime: number;
    id: string;
    onenter: ((this: TextTrackCue, ev: Event) => any) | null;
    onexit: ((this: TextTrackCue, ev: Event) => any) | null;
    pauseOnExit: boolean;
    startTime: number;
    text: string;
    getCueAsHTML(): DocumentFragment;
    addEventListener<K extends keyof TextTrackCueEventMap>(
        type: K,
        listener: (this: TextTrackCue, ev: TextTrackCueEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions,
    ): void;
    addEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions,
    ): void;
    removeEventListener<K extends keyof TextTrackCueEventMap>(
        type: K,
        listener: (this: TextTrackCue, ev: TextTrackCueEventMap[K]) => any,
        options?: boolean | EventListenerOptions,
    ): void;
    removeEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | EventListenerOptions,
    ): void;
}
