import { getUniqueTrackId } from '../getUniqueTrackId';

export type TrackProps<T extends {}> = Partial<{
    label: string;
    language: string;
    id: string;
    kind: string;
    sourceBuffer: SourceBuffer | null;
    props: T;
}>;

/**
 * A Track class that contains all of the common functionality for AudioTrack and VideoTrack
 * @see {@link https://html.spec.whatwg.org/multipage/embedded-content.html}
 */
export abstract class Track<T> extends EventTarget implements TrackProps<T> {
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

    public readonly props: T | undefined;

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
        props = undefined,
    }: Partial<TrackProps<T>>) {
        super();

        this.label = label;
        this.language = language;
        this.id = id;
        this.sourceBuffer = sourceBuffer;
        this.props = props;
    }
}
