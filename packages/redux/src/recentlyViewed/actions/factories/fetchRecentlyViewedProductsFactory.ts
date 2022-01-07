import * as actionTypes from '../../actionTypes';
import { areRecentlyViewedProductsFetched } from '../../selectors';
import type { Dispatch } from 'redux';
import type { FetchRecentlyViewedProductsAction } from '../../types';
import type { FetchRecentlyViewedProductsFactory } from './types';
import type {
  GetRecentlyViewedProducts,
  GetRecentlyViewedProductsData,
} from '@farfetch/blackout-client/recentlyViewed/types';
import type { StoreState } from '../../../types';

/**
 * Method to create a thunk factory configured with the specified client fo fetch recently viewed products.
 *
 * @param getRecentlyViewedProducts - Get recently viewed products client.
 *
 * @returns Thunk factory.
 */

const fetchRecentlyViewedProducts: FetchRecentlyViewedProductsFactory<GetRecentlyViewedProducts> =

    getRecentlyViewedProducts =>
    (query, config) =>
    async (
      dispatch: Dispatch<FetchRecentlyViewedProductsAction>,
      getState: () => StoreState,
    ): Promise<GetRecentlyViewedProductsData> => {
      if (areRecentlyViewedProductsFetched(getState())) {
        console.warn(`
            @farfetch/blackout-redux/recentlyViewed - Seems you are trying to fetch recently viewed products more than once.
            Please make sure you only request the products once, and use the "saveRecentlyViewedProduct" action to mark the product as viewed when a product page is visited.
            Keep in mind that "saveRecentlyViewedProduct" will only store locally the recently viewed product and will not persist it on the server.
            For that, make sure you are using analytics with Omnitracking integration.
        `);
      }

      dispatch({
        type: actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_REQUEST,
      });

      try {
        const result = await getRecentlyViewedProducts(query, config);

        dispatch({
          type: actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_SUCCESS,
          payload: result,
        });

        return result;
      } catch (error) {
        dispatch({
          type: actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_FAILURE,
          payload: { error },
        });

        throw error;
      }
    };

export default fetchRecentlyViewedProducts;
