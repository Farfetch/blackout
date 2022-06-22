import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import checkoutOrderOperation from '@farfetch/blackout-redux/entities/schemas/checkoutOrderOperation';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetOperations,
  GetOperationsQuery,
  GetOperationsResponse,
} from '@farfetch/blackout-client/checkout/types';

/**
 * Method responsible for obtaining the checkout order operations.
 *
 * @param getOperations - Get checkout operations client.
 *
 * @returns Thunk factory.
 */
export const fetchCheckoutOrderOperationsFactory =
  (getOperations: GetOperations) =>
  /**
   * @param id - Universal identifier of the Checkout order.
   * @param query - Query params to retrieve the checkout operations.
   * @param config - Custom configurations to send to the client instance (axios).
   *
   * @returns Thunk to be dispatched to the redux store.
   */
  (id: number, query?: GetOperationsQuery, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetOperationsResponse> => {
    dispatch({
      type: actionTypes.FETCH_CHECKOUT_ORDER_OPERATIONS_REQUEST,
    });

    try {
      const result = await getOperations(id, query, config);

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
