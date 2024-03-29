import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Reset checkout order delivery bundle provisioning state.
 */
const resetCheckoutOrderDeliveryBundleProvisioning =
  () => (dispatch: Dispatch) => {
    dispatch({
      type: actionTypes.RESET_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_STATE,
    });
  };

export default resetCheckoutOrderDeliveryBundleProvisioning;
