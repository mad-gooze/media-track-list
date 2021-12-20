import { getUniqueTrackId } from './getUniqueTrackId';

export type TrackProps = Partial<{
    label: string;
    language: string;
    id: string;
    kind: string;
    sourceBuffer: SourceBuffer | null;
}>;

/**
 * A Track class that contains all of the common functionality for AudioTrack and VideoTrack
 * @see {@link https://html.spec.whatwg.org/multipage/embedded-content.html}
 */
export abstract class Track extends EventTarget implements TrackProps {
    /**
     * The menu label for this track.
     */
    public readonly label: string;
    /**
     * A unique id for this Track.
     */
    public readonly id: string;
    /**
     * A valid two character language code.
     */
    public readonly language: string;

    public readonly kind: string = '';

    public readonly sourceBuffer: SourceBuffer | null = null;

    /**
     * @internal
     */
    public abstract _destroy(): void;

    constructor({
        label = '',
        language = '',
        id = getUniqueTrackId(),
        sourceBuffer = null,
    }: Partial<TrackProps>) {
        super();

        this.label = label;
        this.language = language;
        this.id = id;
        this.sourceBuffer = sourceBuffer;
    }
}
