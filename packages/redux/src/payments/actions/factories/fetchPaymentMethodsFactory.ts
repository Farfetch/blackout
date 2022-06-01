import {
  FETCH_PAYMENT_METHODS_FAILURE,
  FETCH_PAYMENT_METHODS_REQUEST,
  FETCH_PAYMENT_METHODS_SUCCESS,
} from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { FetchPaymentMethodsAction } from '../../types';
import type {
  GetPaymentMethods,
  PaymentMethod,
} from '@farfetch/blackout-client/payments/types';

/**
 * @param id     - Universal identifier of the order.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for loading the payment methods.
 *
 * @param getPaymentMethods - Get payment methods client.
 *
 * @returns Thunk factory.
 */
const fetchPaymentMethodsFactory =
  (getPaymentMethods: GetPaymentMethods) =>
  (orderId: number, config?: Config) =>
  async (
    dispatch: Dispatch<FetchPaymentMethodsAction>,
  ): Promise<PaymentMethod> => {
    dispatch({
      type: FETCH_PAYMENT_METHODS_REQUEST,
    });

    try {
      const result = await getPaymentMethods(orderId, config);

      dispatch({
        payload: {
          entities: {
            checkout: {
              [orderId]: {
                paymentMethods: result,
              },
            },
          },
        },
        type: FETCH_PAYMENT_METHODS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_PAYMENT_METHODS_FAILURE,
      });

      throw error;
    }
  };

export default fetchPaymentMethodsFactory;
