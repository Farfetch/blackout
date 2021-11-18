import { RESET_ENTITIES } from '../actionTypes';

/**
 * Reset state to its initial value.
 *
 * @function reset
 * @memberof module:entities/actions
 *
 * @returns {Function} - Dispatch reset action.
 */
export default () => dispatch => {
  dispatch({
    type: RESET_ENTITIES,
  });
};
