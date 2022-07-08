export const LinkStyled = {
  display: 'block',
  width: '100%',
  height: '100%',
} as React.CSSProperties;

export const ImageStyled = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
} as React.CSSProperties;

export const ImageThumbnail = {
  ...ImageStyled,
  zIndex: 1,
  opacity: 1,
};
