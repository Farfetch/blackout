import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import checkoutOrderOperation from '../../../entities/schemas/checkoutOrderOperation';
import type {
  CheckoutOrder,
  CheckoutOrderOperations,
  Config,
  GetCheckoutOrderOperations,
  GetCheckoutOrderOperationsQuery,
} from '@farfetch/blackout-client';
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
      dispatch({
        payload: { error },
        type: actionTypes.FETCH_CHECKOUT_ORDER_OPERATIONS_FAILURE,
      });

      throw error;
    }
  };

export default fetchCheckoutOrderOperationsFactory;
