import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Method responsible for saving a product on the store to mark it as recently
 * viewed. This action will not persist the data on the server. For that, we need
 * to use \@farfetch/blackout-react/analytics (for web) or
 * \@farfetch/blackout-react-native-analytics (for mobile apps) Omnitracking
 * integration.
 *
 * @returns Thunk factory.
 */
const saveRecentlyViewedProduct =
  (productId: number) =>
  (dispatch: Dispatch): void => {
    const payload = [
      {
        productId: Number(productId),
        lastVisitDate: new Date().toISOString(),
      },
    ];
    dispatch({
      type: actionTypes.SAVE_RECENTLY_VIEWED_PRODUCT,
      payload,
    });
  };

export default saveRecentlyViewedProduct;
