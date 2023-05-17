/**
 * Contains InteractionType that are supported by default by the integrations
 * included in this package. To be used in analytics.track or analytics.page calls.
 */
enum InteractionType {
  Click = 'Click',
  DoubleClick = 'Double Click',
  Submit = 'Submit',
  Hover = 'Hover',
  Scroll = 'Scroll',
  Resize = 'Resize',
  Keypress = 'Keypress',
  Touch = 'Touch',
  Tap = 'Tap',
  Swipe = 'Swipe',
  Drag = 'Drag',
  Drop = 'Drop',
}

export default InteractionType;
