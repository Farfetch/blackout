import { MediaContainer } from './styles.js';
import Audio from './components/audio/index.js';
import Image from './components/image/index.js';
import React, { type ReactElement } from 'react';
import Video from './components/video/index.js';
import type {
  AudioComponent,
  ImageComponent,
  MediaComponent,
  VideoComponent,
} from '../../../types/index.js';

const Media = ({
  data: { fields },
  viewportBreakpoint,
  media,
}: MediaComponent): ReactElement | null => {
  const { image, video, audio } = fields;
  const hasImage = image !== undefined ? image?.type === 'image' : false;
  const hasVideo = video !== undefined ? video?.type === 'video' : false;
  const hasAudio = audio !== undefined ? audio?.customType === 'Audio' : false;
  let content;

  if (hasVideo) {
    content = (
      <Video
        data={fields as VideoComponent['data']} // cast is valid as check has been done before
        hasVideo={hasVideo}
        breakpoint={viewportBreakpoint}
        media={media}
      />
    );
  } else if (hasAudio) {
    content = (
      <Audio
        data={fields as AudioComponent['data']} // cast is valid as check has been done before
        hasAudio={hasAudio}
        breakpoint={viewportBreakpoint}
        media={media}
      />
    );
  } else if (hasImage) {
    content = (
      <Image
        data={fields as ImageComponent['data']} // cast is valid as check has been done before
        showAsThumbnail={false}
        breakpoint={viewportBreakpoint}
        media={media}
      />
    );
  } else {
    return null;
  }

  return (
    <div style={MediaContainer} data-test={'mediaComponent'}>
      {content}
    </div>
  );
};

export default Media;
