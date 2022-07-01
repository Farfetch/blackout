import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetPaymentMethods,
  PaymentMethods,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchPaymentMethodsAction } from '../../types';

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
  ): Promise<PaymentMethods> => {
    try {
      dispatch({
        type: actionTypes.FETCH_PAYMENT_METHODS_REQUEST,
      });

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
        type: actionTypes.FETCH_PAYMENT_METHODS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_PAYMENT_METHODS_FAILURE,
      });

      throw error;
    }
  };

export default fetchPaymentMethodsFactory;
