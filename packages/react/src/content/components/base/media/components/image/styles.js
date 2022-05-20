export const LinkStyled = {
  display: 'block',
  width: '100%',
  height: '100%',
};

export const ImageStyled = showVideo => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  zIndex: showVideo ? -1 : 1,
  opacity: showVideo ? '0 !important' : 1,
});
