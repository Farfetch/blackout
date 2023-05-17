import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

const resetUserSubscriptions =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({ type: actionTypes.RESET_USER_SUBSCRIPTIONS });
  };

export default resetUserSubscriptions;
