import * as actionTypes from '../../actionTypes';
import {
  type CheckoutOrder,
  type CheckoutOrderOperation,
  type Config,
  type GetCheckoutOrderOperation,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import checkoutOrderOperation from '../../../entities/schemas/checkoutOrderOperation';
import type { Dispatch } from 'redux';

/**
 * Method responsible for obtaining the checkout order operation.
 *
 * @param getCheckoutOperation - Get checkout operation client.
 *
 * @returns Thunk factory.
 */
const fetchCheckoutOrderOperationFactory =
  (getCheckoutOperation: GetCheckoutOrderOperation) =>
  (
    checkoutOrderId: CheckoutOrder['id'],
    operationId: CheckoutOrderOperation['id'],
    config?: Config,
  ) =>
  async (dispatch: Dispatch): Promise<CheckoutOrderOperation> => {
    dispatch({
      type: actionTypes.FETCH_CHECKOUT_ORDER_OPERATION_REQUEST,
    });

    try {
      const result = await getCheckoutOperation(
        checkoutOrderId,
        operationId,
        config,
      );

      dispatch({
        payload: normalize(result, checkoutOrderOperation),
        type: actionTypes.FETCH_CHECKOUT_ORDER_OPERATION_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_CHECKOUT_ORDER_OPERATION_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchCheckoutOrderOperationFactory;
