import * as actionTypes from '../../actionTypes';
import {
  type CheckoutOrder,
  type Config,
  type GetCheckoutOrderPaymentMethods,
  type PaymentMethods,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchCheckoutOrderPaymentMethodsAction } from '../../types';

/**
 * Method responsible for loading the payment methods for a checkout order.
 *
 * @param getCheckoutOrderPaymentMethods - Get payment methods client.
 *
 * @returns Thunk factory.
 */
const fetchCheckoutOrderPaymentMethodsFactory =
  (getCheckoutOrderPaymentMethods: GetCheckoutOrderPaymentMethods) =>
  (checkoutOrderId: CheckoutOrder['id'], config?: Config) =>
  async (
    dispatch: Dispatch<FetchCheckoutOrderPaymentMethodsAction>,
  ): Promise<PaymentMethods> => {
    try {
      dispatch({
        type: actionTypes.FETCH_CHECKOUT_ORDER_PAYMENT_METHODS_REQUEST,
      });

      const result = await getCheckoutOrderPaymentMethods(
        checkoutOrderId,
        config,
      );

      dispatch({
        payload: {
          entities: {
            checkout: {
              [checkoutOrderId]: {
                paymentMethods: result,
              },
            },
          },
          result,
        },
        type: actionTypes.FETCH_CHECKOUT_ORDER_PAYMENT_METHODS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_CHECKOUT_ORDER_PAYMENT_METHODS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchCheckoutOrderPaymentMethodsFactory;
