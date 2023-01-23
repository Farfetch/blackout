import {
  ADD_ITEM_TO_BAG_SUCCESS,
  DELETE_BAG_ITEM_SUCCESS,
  GET_BAG_SUCCESS,
  UPDATE_BAG_ITEM_SUCCESS,
} from '../actionTypes';
import {
  doGetBagOperation,
  resetBagOperationsEntities,
  resetState,
} from '../actions';
import { getBag, getBagId } from '../selectors';
import { getBagOperation } from '../../client';

const INTERCEPTED_BAG_ACTIONS = [
  ADD_ITEM_TO_BAG_SUCCESS,
  GET_BAG_SUCCESS,
  UPDATE_BAG_ITEM_SUCCESS,
  DELETE_BAG_ITEM_SUCCESS,
];

/**
 * Middleware to clear previous operations and to fetch the operation of the
 * newly executed bag request, if successful.
 *
 * @function getOperationsOnBagRequestSuccess
 * @memberof module:bags/middlewares
 *
 * @param {object} store - Redux store at the moment.
 *
 * @returns {Function} Redux middleware.
 */
export default store => next => action => {
  if (!INTERCEPTED_BAG_ACTIONS.includes(action.type)) {
    return next(action);
  }

  const bagId = getBagId(store.getState());
  const controls = getBag(store.getState())?.['@controls'];

  if (controls) {
    store.dispatch(resetState(['bagOperations']));
    store.dispatch(resetBagOperationsEntities());

    const getOperation = doGetBagOperation(getBagOperation);

    Object.values(controls).forEach(({ href }) => {
      const operationId = href?.split('/')?.pop();

      if (operationId) {
        store.dispatch(getOperation(bagId, operationId));
      }
    });
  }

  return next(action);
};
