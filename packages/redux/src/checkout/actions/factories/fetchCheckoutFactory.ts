import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetCheckoutOrder,
  GetCheckoutOrderQuery,
  GetCheckoutOrderResponse,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import checkoutSchema from '../../../entities/schemas/checkout';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types';

/**
 * Method responsible for obtaining the checkout.
 *
 * @param getCheckoutOrder - Get checkout client.
 *
 * @returns Thunk factory.
 */

const fetchCheckoutFactory =
  (getCheckoutOrder: GetCheckoutOrder) =>
  (id: number, query: GetCheckoutOrderQuery, config?: Config) =>
  async (
    dispatch: Dispatch,
    getState: () => StoreState,
    {
      getOptions = arg => ({ productImgQueryParam: arg.productImgQueryParam }),
    }: GetOptionsArgument,
  ): Promise<GetCheckoutOrderResponse> => {
    try {
      dispatch({
        type: actionTypes.FETCH_CHECKOUT_REQUEST,
      });

      const result = await getCheckoutOrder(id, query, config);

      if (result.checkoutOrder) {
        const { productImgQueryParam } = getOptions(getState);

        result.checkoutOrder.items = result.checkoutOrder.items.map(item => ({
          ...item,
          productImgQueryParam,
        }));
      }

      dispatch({
        payload: normalize(result, checkoutSchema),
        type: actionTypes.FETCH_CHECKOUT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_CHECKOUT_FAILURE,
      });

      throw error;
    }
  };
export default fetchCheckoutFactory;
