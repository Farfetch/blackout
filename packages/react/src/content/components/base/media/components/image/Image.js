import { imageArrToObj } from '../utils';
import { ImageStyled, LinkStyled } from './styles';
import PropTypes from 'prop-types';
import React from 'react';

const XS_BREAKPOINT_PREFERENCE_ORDER = ['Xs', 'Sm', 'Md', 'Lg'];
const SM_BREAKPOINT_PREFERENCE_ORDER = ['Sm', 'Xs', 'Md', 'Lg'];
const MD_BREAKPOINT_PREFERENCE_ORDER = ['Md', 'Lg', 'Sm', 'Xs'];
const LG_BREAKPOINT_PREFERENCE_ORDER = ['Lg', 'Md', 'Sm', 'Xs'];

const VW_BREAKPOINT_TO_IMAGE_SRC = {
  xs: XS_BREAKPOINT_PREFERENCE_ORDER,
  sm: SM_BREAKPOINT_PREFERENCE_ORDER,
  md: MD_BREAKPOINT_PREFERENCE_ORDER,
  lg: LG_BREAKPOINT_PREFERENCE_ORDER,
};

const getBreakpoint = (sources, breakpoint) => {
  return VW_BREAKPOINT_TO_IMAGE_SRC[breakpoint]?.find(
    imgBreakpoint => sources[imgBreakpoint],
  );
};

const Image = ({
  data: { cta, image },
  'data-test': dataTest,
  showVideo,
  breakpoint,
}) => {
  const hasLink = !!(
    cta &&
    cta.url &&
    cta.url !== '/null/' &&
    cta.url !== undefined
  );
  const imageSource = imageArrToObj(image.assets);
  const src = imageSource
    ? imageSource[getBreakpoint(imageSource, breakpoint)]
    : undefined;

  return hasLink ? (
    <a
      href={cta?.url}
      style={LinkStyled}
      aria-label={cta?.text}
      target={cta?.target || '_self'}
      data-test={`${dataTest}-link`}
    >
      <img alt={image.alt} style={ImageStyled(showVideo)} src={src} />
    </a>
  ) : (
    <img alt={image.alt} style={ImageStyled(showVideo)} src={src} />
  );
};

Image.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.object,
    cta: PropTypes.object,
  }),
  'data-test': PropTypes.string,
  showVideo: PropTypes.bool,
};

export default Image;
