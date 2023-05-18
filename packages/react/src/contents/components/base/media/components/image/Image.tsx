import { DEFAULT_MEDIA } from '../../../index.js';
import { ImageStyled, LinkStyled } from './styles.js';
import CallToAction from '../../../callToAction/CallToAction.jsx';
import getFallbackSrcImage from '../utils/getFallbackSrcImage.js';
import React from 'react';
import Thumbnail from '../thumbnail/index.js';
import type { ImageComponent } from '../../../../../types/index.js';

const Image = ({
  data,
  showAsThumbnail,
  breakpoint,
  media = DEFAULT_MEDIA,
  ...props
}: ImageComponent): JSX.Element => {
  const {
    cta,
    image: { alt, assets },
  } = data;

  const hasLink = !!(
    cta &&
    cta.url &&
    cta.url !== '/null/' &&
    cta.url !== undefined
  );
  const fallbackSrc = getFallbackSrcImage(assets, breakpoint);

  const renderPicture = () => {
    return (
      <picture>
        {assets.map(({ source, size }, index) => (
          <source
            key={index}
            srcSet={source}
            media={`(min-width: ${media[size]})`}
            {...props}
          />
        ))}
        <img
          src={fallbackSrc ?? undefined}
          data-src={fallbackSrc}
          alt={alt}
          style={ImageStyled}
        />
        <noscript>
          {fallbackSrc && (
            <picture>
              <img src={fallbackSrc} alt={alt} {...props} />
            </picture>
          )}
        </noscript>
      </picture>
    );
  };

  if (showAsThumbnail) {
    return <Thumbnail image={data.image} breakpoint={breakpoint} />;
  }

  return hasLink ? (
    <CallToAction
      data={{ url: cta?.url, target: cta?.target || '_self' }}
      style={LinkStyled}
      aria-label={cta?.text}
      data-test={'image-link'}
      key={'cta-image'}
    >
      {renderPicture()}
    </CallToAction>
  ) : (
    renderPicture()
  );
};

export default Image;
