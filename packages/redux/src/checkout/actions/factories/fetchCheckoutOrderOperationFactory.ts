import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import checkoutOrderOperation from '../../../entities/schemas/checkoutOrderOperation';
import type {
  CheckoutOrderOperation,
  Config,
  GetCheckoutOrderOperation,
  GetCheckoutOrderOperationParams,
} from '@farfetch/blackout-client';
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
  /**
   * @param params - Params to retrieve the checkout operation.
   * @param config - Custom configurations to send to the client instance (axios).
   *
   * @returns Thunk to be dispatched to the redux store.
   */
  (params: GetCheckoutOrderOperationParams, config?: Config) =>
  async (dispatch: Dispatch): Promise<CheckoutOrderOperation> => {
    dispatch({
      type: actionTypes.FETCH_CHECKOUT_ORDER_OPERATION_REQUEST,
    });

    try {
      const result = await getCheckoutOperation(params, config);

      dispatch({
        payload: normalize(result, checkoutOrderOperation),
        type: actionTypes.FETCH_CHECKOUT_ORDER_OPERATION_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: actionTypes.FETCH_CHECKOUT_ORDER_OPERATION_FAILURE,
      });

      throw error;
    }
  };

export default fetchCheckoutOrderOperationFactory;
