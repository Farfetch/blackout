import { fetchBag } from '../actions/index.js';
import { getBagId } from '../selectors.js';
import { SET_BAG_PROMOCODES_SUCCESS } from '../actionTypes.js';
import type { AnyAction, Middleware } from 'redux';
import type { FetchBagAction } from '../types/index.js';
import type { GetOptionsArgument, StoreState } from '../../types/index.js';
import type { ThunkDispatch } from 'redux-thunk';

type FetchBagOnSetPromocodesRequestSuccess = {
  // Redux action dispatch.
  dispatch: ThunkDispatch<StoreState, GetOptionsArgument, FetchBagAction>;
  // Returns the current redux state.
  getState: () => StoreState;
};

/**
 * Middleware to fetch the bag of the
 * newly executed set promocodes request, if successful.
 *
 * @param store - Redux store at the moment.
 *
 * @returns Redux middleware.
 */

const fetchBagOnSetPromocodesRequestSuccess: Middleware =
  ({ dispatch, getState }: FetchBagOnSetPromocodesRequestSuccess) =>
  next =>
  (action: AnyAction) => {
    if (SET_BAG_PROMOCODES_SUCCESS !== action.type) {
      return next(action);
    }

    const bagId = getBagId(getState());

    if (bagId) {
      dispatch(fetchBag(bagId));
    }

    return next(action);
  };

export default fetchBagOnSetPromocodesRequestSuccess;
