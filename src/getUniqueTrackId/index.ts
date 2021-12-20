let index = 0;

export function getUniqueTrackId(): string {
    return `media-track-${index++}`;
}
