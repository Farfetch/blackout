import { AudioContainer, Play, Player, Thumbnails } from './styles';
import Image from '../image';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const Audio = ({ data, 'data-test': dataTest, hasAudio, breakpoint }) => {
  const { audio, image } = data;
  const hasImages = image.assets.every(asset => {
    if (asset.source) return true;
  });
  const hasThumbnails = hasAudio && hasImages;
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnabledAudio, setHasEnabledAudio] = useState(!hasThumbnails);

  const onPause = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    isPlaying && setHasEnabledAudio(true);
  }, [isPlaying]);

  return (
    <div style={AudioContainer} data-test={dataTest}>
      {hasThumbnails && (
        <div style={Thumbnails}>
          {!isPlaying && (
            <div
              style={Play}
              onClick={() => setIsPlaying(true)}
              data-test="play-button"
            >
              ▶︎
            </div>
          )}
          <Image data={data} data-test={dataTest} breakpoint={breakpoint} />
        </div>
      )}
      {hasEnabledAudio && (
        <ReactPlayer
          url={audio?.fields?.source?.value}
          style={Player(isPlaying)}
          playing={isPlaying}
          onPause={onPause}
          width="100%"
          height="100%"
          controls
          data-test={`${dataTest}-audio`}
        />
      )}
    </div>
  );
};

Audio.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.object,
    audio: PropTypes.object,
    cta: PropTypes.object,
  }),
  'data-test': PropTypes.string,
  hasAudio: PropTypes.bool,
};

export default Audio;
