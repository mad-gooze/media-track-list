# media-track-list

[![CI](https://github.com/mad-gooze/media-track-list/actions/workflows/ci.yml/badge.svg)](https://github.com/mad-gooze/media-track-list/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/mad-gooze/media-track-list/branch/main/graph/badge.svg?token=AA4DFXUB19)](https://codecov.io/gh/mad-gooze/media-track-list)
[![npm](https://img.shields.io/npm/v/media-track-list)](https://www.npmjs.com/package/media-track-list)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/media-track-list)](https://bundlephobia.com/result?p=media-track-list)

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

const videoTrackList = new VideoTrackList({
    id: '0',
    width: 1920,
    height: 1080,
});
```
