import * as actionTypes from '../../actionTypes';
import {
  Config,
  DeletePaymentToken,
  PaymentToken,
  toBlackoutError,
} from '@farfetch/blackout-client';
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
        type: actionTypes.REMOVE_PAYMENT_TOKEN_REQUEST,
      });

      const result = await deletePaymentToken(id, config);

      dispatch({
        meta: { id },
        type: actionTypes.REMOVE_PAYMENT_TOKEN_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.REMOVE_PAYMENT_TOKEN_FAILURE,
      });

      throw error;
    }
  };

export default removePaymentTokenFactory;
