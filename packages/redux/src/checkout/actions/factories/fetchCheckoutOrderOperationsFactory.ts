import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import checkoutOrderOperation from '../../../entities/schemas/checkoutOrderOperation';
import type {
  Config,
  GetCheckoutOrderOperations,
  GetCheckoutOrderOperationsQuery,
  GetCheckoutOrderOperationsResponse,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Method responsible for obtaining the checkout order operations.
 *
 * @param getCheckoutOrderOperations - Get checkout operations client.
 *
 * @returns Thunk factory.
 */
export const fetchCheckoutOrderOperationsFactory =
  (getCheckoutOrderOperations: GetCheckoutOrderOperations) =>
  /**
   * @param id - Universal identifier of the Checkout order.
   * @param query - Query params to retrieve the checkout operations.
   * @param config - Custom configurations to send to the client instance (axios).
   *
   * @returns Thunk to be dispatched to the redux store.
   */
  (id: number, query?: GetCheckoutOrderOperationsQuery, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetCheckoutOrderOperationsResponse> => {
    dispatch({
      type: actionTypes.FETCH_CHECKOUT_ORDER_OPERATIONS_REQUEST,
    });

    try {
      const result = await getCheckoutOrderOperations(id, query, config);

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
