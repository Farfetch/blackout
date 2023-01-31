import { MediaContainer } from './styles';
import Audio from './components/audio';
import Image from './components/image';
import PropTypes from 'prop-types';
import React from 'react';
import Video from './components/video';

const Media = props => {
  const {
    data: { fields },
    viewportBreakpoint,
  } = props;
  const { image, video, audio } = fields;
  const hasImage = image !== undefined ? image?.type === 'image' : false;
  const hasVideo = video !== undefined ? video?.type === 'video' : false;
  const hasAudio = audio !== undefined ? audio?.customType === 'Audio' : false;
  const dataTest = 'media';
  let content;

  if (hasVideo) {
    content = (
      <Video
        data={fields}
        hasVideo={hasVideo}
        breakpoint={viewportBreakpoint}
      />
    );
  } else if (hasAudio) {
    content = (
      <Audio
        data={fields}
        hasAudio={hasAudio}
        breakpoint={viewportBreakpoint}
      />
    );
  } else if (hasImage) {
    content = <Image data={fields} breakpoint={viewportBreakpoint} />;
  } else {
    return null;
  }

  return (
    <div style={MediaContainer} data-test={dataTest}>
      {content}
    </div>
  );
};

Media.propTypes = {
  data: PropTypes.shape({
    fields: PropTypes.shape({
      image: PropTypes.object,
      video: PropTypes.object,
      audio: PropTypes.object,
      cta: PropTypes.object,
    }),
  }),
};

export default Media;
