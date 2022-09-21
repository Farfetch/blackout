import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset checkout order charge state.
 */
const resetCheckoutOrderDeliveryBundleUpgradesState =
  () => (dispatch: Dispatch) => {
    dispatch({
      type: actionTypes.RESET_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_STATE,
    });
  };

export default resetCheckoutOrderDeliveryBundleUpgradesState;
