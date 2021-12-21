# media-track-list

`media-track-list` implements [VideoTrackList/AudioTrackList](https://html.spec.whatwg.org/multipage/media.html#audiotracklist-and-videotracklist-objects) interfaces in JavaScript. 

This can be used for extending native HTMLVideoElement API.

## Usage

```js
import {
    VideoTrackList,
    AudioTrackList,
    VideoTrack,
    AudioTrack,
} from 'media-track-list';

const videoTrackList = new VideoTrackList({ id: '0', width: 1920, height: 1080 });
```

