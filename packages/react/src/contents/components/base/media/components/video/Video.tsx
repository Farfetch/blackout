import { DEFAULT_MEDIA } from '../../..';
import { Play, Player, Thumbnails, VideoContainer } from './styles';
import Image from '../image';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import type { VideoComponent } from '../../../../../types';

const Video = ({
  data,
  hasVideo,
  breakpoint,
  media = DEFAULT_MEDIA,
}: VideoComponent): JSX.Element => {
  const { video, image } = data;
  const hasImages = image.assets.every(asset => !!asset.source);
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
    <div style={VideoContainer} data-test={video.name}>
      {hasThumbnails && (
        <div style={Thumbnails}>
          <div
            style={Play}
            onClick={() => setIsPlaying(true)}
            data-test="play-button"
            role="button"
            aria-pressed={isPlaying}
          >
            ▶︎
          </div>
          <Image
            data={data}
            data-test={`${video.name}-thumbnail`}
            showAsThumbnail={hasThumbnails}
            breakpoint={breakpoint}
            media={media}
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
          data-test={`${video.name}-video`}
        />
      )}
    </div>
  );
};

export default Video;
