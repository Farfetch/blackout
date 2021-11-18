import * as actionTypes from '../actionTypes';

/**
 * Reset state to its initial value.
 *
 * @function doResetSizeScales
 * @memberof module:sizeScales/actions
 *
 * @returns {Function} Thunk factory.
 */
export default () => dispatch => {
  dispatch({
    type: actionTypes.RESET_SIZESCALES,
  });
};
