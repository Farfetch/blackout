import { MediaContainer } from './styles';
import Audio from './components/audio';
import Image from './components/image';
import React, { ReactElement } from 'react';
import Video from './components/video';
import type { MediaComponent } from '../../../types';

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
        data={fields}
        hasVideo={hasVideo}
        breakpoint={viewportBreakpoint}
        media={media}
      />
    );
  } else if (hasAudio) {
    content = (
      <Audio
        data={fields}
        hasAudio={hasAudio}
        breakpoint={viewportBreakpoint}
        media={media}
      />
    );
  } else if (hasImage) {
    content = (
      <Image
        data={fields}
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
