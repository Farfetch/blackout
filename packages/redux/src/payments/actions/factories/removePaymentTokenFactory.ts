import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type DeletePaymentToken,
  type PaymentToken,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { RemovePaymentTokensAction } from '../../types/index.js';

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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.REMOVE_PAYMENT_TOKEN_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default removePaymentTokenFactory;
