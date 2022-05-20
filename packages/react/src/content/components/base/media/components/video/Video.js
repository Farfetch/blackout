import { Play, Player, Thumbnails, VideoContainer } from './styles';
import Image from '../image';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const Video = ({ data, 'data-test': dataTest, hasVideo, breakpoint }) => {
  const { video, image } = data;
  const hasImages = image.assets.every(asset => {
    if (asset.source) return true;
  });
  const hasThumbnails = hasVideo && hasImages;
  const VIDEO_CONFIG = {
    youtube: {
      playerVars: {
        controls: 0,
      },
    },
  };
  const [hasEnabledVideo, setHasEnabledVideo] = useState(!hasThumbnails);
  const [isPlaying, setIsPlaying] = useState(false);

  const onPause = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    isPlaying && setHasEnabledVideo(true);
  }, [isPlaying]);

  return (
    <div style={VideoContainer} data-test={dataTest}>
      {hasThumbnails && (
        <div style={Thumbnails}>
          <div
            style={Play}
            onClick={() => setIsPlaying(true)}
            data-test="play-button"
          >
            ▶︎
          </div>
          <Image
            data={data}
            data-test={dataTest}
            showVideo={isPlaying}
            breakpoint={breakpoint}
          />
        </div>
      )}
      {hasEnabledVideo && (
        <ReactPlayer
          url={video.source}
          config={VIDEO_CONFIG}
          style={Player(isPlaying)}
          playing={isPlaying}
          onPause={onPause}
          width="100%"
          height="100%"
          controls
          data-test={`${dataTest}-video`}
        />
      )}
    </div>
  );
};

Video.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.object,
    video: PropTypes.object,
    cta: PropTypes.object,
  }),
  'data-test': PropTypes.string,
  hasVideo: PropTypes.bool,
};

export default Video;
