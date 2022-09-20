import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

const resetSubscriptionPackages =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({ type: actionTypes.RESET_SUBSCRIPTION_PACKAGES });
  };

export default resetSubscriptionPackages;
