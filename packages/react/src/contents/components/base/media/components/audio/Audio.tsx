import { AudioContainer, Play, Player, Thumbnails } from './styles.js';
import React, { useEffect, useState } from 'react';
import ReactPlayerImport from 'react-player';
import Thumbnail from '../thumbnail/index.js';
import type { AudioComponent } from '../../../../../types/index.js';

// react-player is a cjs package whose module.exports is an object
// with a "default" property pointing to the ReactPlayer component.
const ReactPlayer = ReactPlayerImport.default;

const Audio = ({ data, hasAudio, breakpoint }: AudioComponent): JSX.Element => {
  const { audio, image } = data;
  const hasImages = image.assets.every(asset => !!asset.source);
  const hasThumbnails = hasAudio && hasImages;
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnabledAudio, setHasEnabledAudio] = useState(!hasThumbnails);
  const audioName = audio?.fields?.source?.name;

  const onPause = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    isPlaying && setHasEnabledAudio(true);
  }, [isPlaying]);

  return (
    <div style={AudioContainer} data-test={audioName}>
      {hasThumbnails && (
        <div style={Thumbnails}>
          {!isPlaying && (
            <div
              style={Play}
              onClick={() => setIsPlaying(true)}
              data-test="play-button"
              role="button"
              aria-pressed={isPlaying}
            >
              ▶︎
            </div>
          )}
          <Thumbnail image={image} breakpoint={breakpoint} />
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
          data-test={`${audioName}-audio`}
        />
      )}
    </div>
  );
};

export default Audio;
