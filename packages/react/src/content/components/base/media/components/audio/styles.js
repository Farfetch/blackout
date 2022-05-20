export const Player = showAudio => ({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  opacity: showAudio ? 1 : 0,
  zIndex: showAudio ? 4 : -1,
  cursor: 'pointer',
  transition: 'opacity 0.5s linear',
});

export const AudioContainer = {
  display: 'flex',
  position: 'relative',
  width: '100%',
  height: '100%',
  backgroundColor: 'inherit',
  alignItems: 'center',
  justifyContent: 'center',
};

export const Thumbnails = {
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
};

export const Play = {
  position: 'absolute',
  marginLeft: 'auto',
  marginTop: 'auto',
  fontSize: '30px',
  cursor: 'pointer',
  zIndex: 2,
};
