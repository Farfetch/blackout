/**
 * Contains InteractionTypes that are supported by default by the integrations
 * included in this package. To be used in analytics.track or analytics.page calls.
 */
enum InteractionTypes {
  CLICK = 'Click',
  DOUBLE_CLICK = 'Double Click',
  SUBMIT = 'Submit',
  HOVER = 'Hover',
  SCROLL = 'Scroll',
  RESIZE = 'Resize',
  KEYPRESS = 'Keypress',
  TOUCH = 'Touch',
  TAP = 'Tap',
  SWIPE = 'Swipe',
  DRAG = 'Drag',
  DROP = 'Drop',
}

export default InteractionTypes;