import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';
import type {
  ResetBagAction,
  ResetBagEntitiesAction,
  ResetBagStateAction,
} from '../types/index.js';
import type { StoreState } from '../../types/index.js';
import type { ThunkDispatch } from 'redux-thunk';

/**
 * Reset bag related entities to its initial value.
 *
 * @example
 * ```
 * // Store before executing action
 * const store = {
 *  entities: {
 *    bagItems: { 1: {...} }
 *  }
 * }
 *
 * // Result of reset entities:
 * const store = { entities: {} }
 * ```
 *
 * @returns Dispatch reset bag entities action.
 */
const resetEntities = () => (dispatch: Dispatch<ResetBagEntitiesAction>) => {
  dispatch({
    type: actionTypes.RESET_BAG_ENTITIES,
  });
};

/**
 * Reset bag state to its initial value.
 *
 * @example <caption>Reset with no fields to reset, resetting all</caption>
 * ```
 * // State before executing action
 * const state = {
 *   id: '123-456-789',
 *   error: null,
 *   isLoading: false,
 *   result: {
 *     bagSummary: { ... }
 *   },
 *   items: {
 *     ids: [123],
 *     item: {
 *       error: {
 *         123: {
 *           message: 'error'
 *         }
 *       },
 *       isLoading: {
 *         123: true
 *       }
 *     }
 *   }
 * };
 *
 * // Result of reset:
 * const state = {
 *   id: null,
 *   error: null,
 *   isLoading: false,
 *   result: {},
 *   items: {
 *     ids: [],
 *     item: {
 *       error: {},
 *       isLoading: {}
 *     }
 *   }
 * };
 *
 * // Usage
 * dispatch(resetBagState());
 *
 * ```
 * @example <caption>Reset with fields to reset</caption>
 * ```
 * // State object before executing action
 * const state = {
 *   id: '123-456-789',
 *   error: { message: 'error' },
 *   isLoading: false,
 *   result: {
 *     bagSummary: { ... }
 *   },
 *   items: {
 *     ids: [123],
 *     items: {
 *       error: {
 *         123: {
 *           message: 'error'
 *         }
 *       },
 *       isLoading: {
 *         123: true
 *       }
 *     }
 *   }
 * };
 *
 * // Result of reset:
 * const state = {
 *   id: '123-456-789',
 *   error: null,
 *   isLoading: false,
 *   result: {
 *     bagSummary: {}
 *   },
 *   items: {
 *     ids: [123],
 *     item: {
 *       error: {},
 *       isLoading: {
 *         123: true
 *       }
 *     }
 *   }
 * };
 *
 * // Usage
 * dispatch(resetBagState(["error"]));
 *
 * ```
 *
 * @param fieldsToReset - List of fields to reset during the reset operation.
 *
 * @returns Dispatch reset bag state action.
 */
const resetBagState =
  (fieldsToReset?: string[]) =>
  (dispatch: Dispatch<ResetBagStateAction>): void => {
    dispatch({
      payload: { fieldsToReset },
      type: actionTypes.RESET_BAG_STATE,
    });
  };

/**
 * Reset bag state and related entities to its initial value.
 *
 * @example
 * ```
 * import { resetBag } from '@farfetch/blackout-redux';
 *
 * // State and store before executing action
 * const state = { id: '123', error: null, isLoading: false, result: {...}, items: {...} };
 * const store = {
 *     entities: {
 *         bagItems: { 1: {...} }
 *     }
 * }
 *
 * // Result of resetBag:
 * const state =  { id: null, error: null, isLoading: false, result: null, items: {} }
 * const store = { entities: {} }
 *
 * // Usage
 * dispatch(resetBag());
 *
 * ```
 *
 * @returns Dispatch reset bag state and entities action.
 */
const resetBag =
  () =>
  (
    dispatch: ThunkDispatch<
      StoreState,
      unknown,
      ResetBagAction | ResetBagEntitiesAction
    >,
  ): void => {
    dispatch(resetBagState());
    dispatch(resetEntities());
  };

export default resetBag;
