import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset checkout order delivery bundle provisioning state.
 */
const resetCheckoutOrderDeliveryBundleProvisioningState =
  () => (dispatch: Dispatch) => {
    dispatch({
      type: actionTypes.RESET_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_STATE,
    });
  };

export default resetCheckoutOrderDeliveryBundleProvisioningState;
