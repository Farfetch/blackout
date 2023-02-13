import * as actionTypes from '../../actionTypes';
import {
  Bag,
  BagPromocodesInformation,
  Config,
  PutBagPromocodes,
  PutBagPromocodesData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Creates a thunk factory configured with the specified client to set.
 *
 * @param putBagPromocodes - Put bag promocodes client.
 *
 * @returns Thunk factory.
 */
const setBagPromocodesFactory =
  (putBagPromocodes: PutBagPromocodes) =>
  (bagId: Bag['id'], data: PutBagPromocodesData, config?: Config) =>
  async (dispatch: Dispatch): Promise<BagPromocodesInformation> => {
    try {
      dispatch({
        type: actionTypes.SET_BAG_PROMOCODES_REQUEST,
      });
      const result = await putBagPromocodes(bagId, data, config);

      dispatch({
        payload: {
          result: bagId,
          entities: {
            bagPromocodesInformation: { [bagId]: result.promoCodesInformation },
          },
        },
        type: actionTypes.SET_BAG_PROMOCODES_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.SET_BAG_PROMOCODES_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default setBagPromocodesFactory;
