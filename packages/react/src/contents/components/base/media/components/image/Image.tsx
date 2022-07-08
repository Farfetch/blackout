import { DEFAULT_MEDIA } from '../../..';
import { imageArrToObj } from '../utils';
import { ImageStyled, ImageThumbnail, LinkStyled } from './styles';
import CallToAction from '../../../callToAction/CallToAction';
import React from 'react';
import type { ImageComponent } from '../../../../../types';

const Image = ({
  data: {
    cta,
    image: { alt, assets, name },
  },
  showAsThumbnail,
  breakpoint,
  media = DEFAULT_MEDIA,
  ...props
}: ImageComponent): JSX.Element => {
  const hasLink = !!(
    cta &&
    cta.url &&
    cta.url !== '/null/' &&
    cta.url !== undefined
  );
  const sourcesBySize = imageArrToObj(assets);
  const fallbackSrc =
    sourcesBySize?.[breakpoint] ||
    sourcesBySize?.Lg ||
    sourcesBySize?.Md ||
    sourcesBySize?.Sm ||
    sourcesBySize?.Xs;

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
          {fallbackSrc && <img src={fallbackSrc} alt={alt} {...props} />}
        </noscript>
      </picture>
    );
  };

  if (showAsThumbnail) {
    return (
      <img
        alt={alt}
        style={ImageThumbnail}
        src={fallbackSrc}
        data-test={`${name}-thumbnail`}
      />
    );
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
