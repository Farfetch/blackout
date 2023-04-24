import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Reset checkout order delivery bundle upgrade provisioning state.
 */
const resetCheckoutOrderDeliveryBundleUpgradeProvisioning =
  () => (dispatch: Dispatch) => {
    dispatch({
      type: actionTypes.RESET_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING_STATE,
    });
  };

export default resetCheckoutOrderDeliveryBundleUpgradeProvisioning;
