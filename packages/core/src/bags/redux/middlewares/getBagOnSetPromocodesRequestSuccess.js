import { doGetBag } from '../actions';
import { getBag as getBagClient } from '../../client';
import { getBagId } from '../selectors';
import { SET_BAG_PROMOCODES_SUCCESS } from '../actionTypes';

/**
 * Middleware to fetch the bag of the
 * newly executed set promocodes request, if successful.
 *
 * @function getBagOnSetPromocodesRequestSuccess
 * @memberof module:bags/middlewares
 *
 * @param {object} store - Redux store at the moment.
 *
 * @returns {Function} Redux middleware.
 */
export default store => next => action => {
  if (SET_BAG_PROMOCODES_SUCCESS !== action.type) {
    return next(action);
  }

  const bagId = getBagId(store.getState());
  const getBag = doGetBag(getBagClient);
  store.dispatch(getBag(bagId));

  return next(action);
};
