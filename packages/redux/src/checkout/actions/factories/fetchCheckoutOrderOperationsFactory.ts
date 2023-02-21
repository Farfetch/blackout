import * as actionTypes from '../../actionTypes';
import {
  type CheckoutOrder,
  type CheckoutOrderOperations,
  type Config,
  type GetCheckoutOrderOperations,
  type GetCheckoutOrderOperationsQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import checkoutOrderOperation from '../../../entities/schemas/checkoutOrderOperation';
import type { Dispatch } from 'redux';

/**
 * Method responsible for obtaining the checkout order operations.
 *
 * @param getCheckoutOrderOperations - Get checkout operations client.
 *
 * @returns Thunk factory.
 */
const fetchCheckoutOrderOperationsFactory =
  (getCheckoutOrderOperations: GetCheckoutOrderOperations) =>
  (
    checkoutOrderId: CheckoutOrder['id'],
    query?: GetCheckoutOrderOperationsQuery,
    config?: Config,
  ) =>
  async (dispatch: Dispatch): Promise<CheckoutOrderOperations> => {
    dispatch({
      type: actionTypes.FETCH_CHECKOUT_ORDER_OPERATIONS_REQUEST,
    });

    try {
      const result = await getCheckoutOrderOperations(
        checkoutOrderId,
        query,
        config,
      );

      dispatch({
        payload: normalize(result, { entries: [checkoutOrderOperation] }),
        type: actionTypes.FETCH_CHECKOUT_ORDER_OPERATIONS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_CHECKOUT_ORDER_OPERATIONS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchCheckoutOrderOperationsFactory;
