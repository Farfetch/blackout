import {
  ADD_BAG_ITEM_SUCCESS,
  FETCH_BAG_SUCCESS,
  REMOVE_BAG_ITEM_SUCCESS,
  UPDATE_BAG_ITEM_SUCCESS,
} from '../actionTypes.js';
import { fetchBagOperation, resetBagOperations } from '../actions/index.js';
import { getBag, getBagId } from '../selectors.js';
import type { AnyAction, Middleware } from 'redux';
import type { FetchBagOperationAction } from '../types/index.js';
import type { StoreState } from '../../types/index.js';
import type { ThunkDispatch } from 'redux-thunk';

const INTERCEPTED_BAG_ACTIONS = [
  ADD_BAG_ITEM_SUCCESS,
  REMOVE_BAG_ITEM_SUCCESS,
  FETCH_BAG_SUCCESS,
  UPDATE_BAG_ITEM_SUCCESS,
];

type FetchBagOperationsOnBagRequestSuccess = {
  // Redux action dispatch.
  dispatch: ThunkDispatch<StoreState, unknown, FetchBagOperationAction>;
  // Returns the current redux state.
  getState: () => StoreState;
};

/**
 * Middleware to clear previous operations and to fetch the operation of the
 * newly executed bag request, if successful.
 *
 * @param store - Redux store at the moment.
 *
 * @returns Redux middleware.
 */
const fetchBagOperationsOnBagRequestSuccess: Middleware =
  ({ dispatch, getState }: FetchBagOperationsOnBagRequestSuccess) =>
  next =>
  (action: AnyAction) => {
    if (!INTERCEPTED_BAG_ACTIONS.includes(action.type)) {
      return next(action);
    }

    const bagId = getBagId(getState());
    const controls = getBag(getState())?.['@controls'];

    if (controls) {
      dispatch(resetBagOperations());

      Object.values(controls).forEach(({ href }) => {
        const operationId = href?.split('/')?.pop();

        if (operationId && bagId) {
          dispatch(fetchBagOperation(bagId, operationId));
        }
      });
    }

    return next(action);
  };

export default fetchBagOperationsOnBagRequestSuccess;
