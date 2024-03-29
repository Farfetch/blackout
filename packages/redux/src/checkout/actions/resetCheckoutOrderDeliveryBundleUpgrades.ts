import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Reset checkout order charge state.
 */
const resetCheckoutOrderDeliveryBundleUpgrades = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.RESET_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_STATE,
  });
};

export default resetCheckoutOrderDeliveryBundleUpgrades;
