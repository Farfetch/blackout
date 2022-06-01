import * as actionTypes from '../../actionTypes';
import { generateDesignerResultHash } from '../../utils';
import { isDesignersResultCached } from '../../selectors';
import resetDesignersState from '../resetDesignersState';
import type {
  Designers,
  GetDesigners,
  GetDesignersQuery,
} from '@farfetch/blackout-client/designers/types';
import type {
  FetchDesignersAction,
  SetDesignersResultHashAction,
} from '../../types';
import type { StoreState } from '../../../types';
import type { ThunkDispatch } from 'redux-thunk';

/**
 * @param query    - Query parameters to apply.
 * @param useCache - Flag to allow a caching mechanism for the designers content, to prevent new
 *                   requests of content already fetched.
 * @param config   - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch all
 * designers grouped by their first letter.
 *
 * @param getDesigners - Get designers client.
 *
 * @returns Thunk factory.
 */
const fetchDesignersFactory =
  (getDesigners: GetDesigners) =>
  (
    query: GetDesignersQuery,
    useCache = false,
    config?: Record<string, unknown>,
  ) =>
  async (
    dispatch: ThunkDispatch<
      StoreState,
      any,
      FetchDesignersAction | SetDesignersResultHashAction
    >,
    getState: () => StoreState,
  ): Promise<{ designers: Designers } | undefined> => {
    const hash = generateDesignerResultHash(query);

    dispatch({
      meta: { hash },
      type: actionTypes.SET_DESIGNERS_RESULT_HASH,
    });

    // Verify if this designer result already exists
    if (useCache) {
      if (isDesignersResultCached(getState(), hash)) {
        return;
      }
    } else {
      dispatch(resetDesignersState());
    }

    dispatch({
      meta: { hash },
      type: actionTypes.FETCH_DESIGNERS_REQUEST,
    });

    try {
      const result = await getDesigners(query, config);

      dispatch({
        payload: { result },
        meta: { hash },
        type: actionTypes.FETCH_DESIGNERS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        meta: { hash },
        type: actionTypes.FETCH_DESIGNERS_FAILURE,
      });

      throw error;
    }
  };

export default fetchDesignersFactory;
