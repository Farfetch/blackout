import {
  REMOVE_PAYMENT_TOKEN_FAILURE,
  REMOVE_PAYMENT_TOKEN_REQUEST,
  REMOVE_PAYMENT_TOKEN_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type {
  DeletePaymentToken,
  PaymentToken,
} from '@farfetch/blackout-client/payments/types';
import type { Dispatch } from 'redux';
import type { RemovePaymentTokensAction } from '../../types';

/**
 * @param tokenId - Universal identifier of the token to be deleted.
 * @param config  - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for deleting a user payment token. This is used for deleting
 * a credit card.
 *
 * @param deletePaymentToken - Delete payment token client.
 *
 * @returns Thunk factory.
 */
const removePaymentTokenFactory =
  (deletePaymentToken: DeletePaymentToken) =>
  (id: PaymentToken['id'], config?: Config) =>
  async (dispatch: Dispatch<RemovePaymentTokensAction>): Promise<void> => {
    try {
      dispatch({
        type: REMOVE_PAYMENT_TOKEN_REQUEST,
      });

      const result = await deletePaymentToken(id, config);

      dispatch({
        meta: { id },
        type: REMOVE_PAYMENT_TOKEN_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: REMOVE_PAYMENT_TOKEN_FAILURE,
      });

      throw error;
    }
  };

export default removePaymentTokenFactory;
