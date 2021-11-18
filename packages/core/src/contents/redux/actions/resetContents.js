import * as actionTypes from '../actionTypes';

/**
 * Reset contents state to its initial value.
 *
 * @function resetContents
 * @memberof module:contents/actions
 *
 * @returns {Function} - Dispatch reset action.
 */
export default () => dispatch => {
  dispatch({
    type: actionTypes.RESET_CONTENTS,
  });
};
