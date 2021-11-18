import * as actionTypes from '../actionTypes';

/**
 * Reset state to its initial value.
 *
 * @function reset
 * @memberof module:sizeGuides/actions
 *
 * @returns {Function} Dispatch reset action.
 */
export default () => dispatch => {
  dispatch({
    type: actionTypes.RESET_SIZEGUIDES,
  });
};
