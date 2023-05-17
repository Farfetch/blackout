import * as actionTypes from '../../actionTypes.js';
import {
  type Bag,
  type BagPromocodesInformation,
  type Config,
  type PutBagPromocodes,
  type PutBagPromocodesData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { SetBagPromocodesAction } from '../../types/index.js';

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
  async (
    dispatch: Dispatch<SetBagPromocodesAction>,
  ): Promise<BagPromocodesInformation> => {
    try {
      dispatch({
        type: actionTypes.SET_BAG_PROMOCODES_REQUEST,
      });

      const result = await putBagPromocodes(bagId, data, config);

      await dispatch({
        payload: result,
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
