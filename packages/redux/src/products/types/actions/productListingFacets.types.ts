import type * as actionTypes from '../../actionTypes/index.js';
import type { Action } from 'redux';
import type { BlackoutError, FacetGroup } from '@farfetch/blackout-client';

interface FetchListingFacetsRequestAction extends Action {
  type: typeof actionTypes.FETCH_PRODUCT_LISTING_FACETS_REQUEST;
}

interface FetchListingFacetsSuccessAction extends Action {
  type: typeof actionTypes.FETCH_PRODUCT_LISTING_FACETS_SUCCESS;
  payload: { result: FacetGroup[] | null };
}

interface FetchListingFacetsFailureAction extends Action {
  type: typeof actionTypes.FETCH_PRODUCT_LISTING_FACETS_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the fetch listing facets request is made.
 */
export type FetchListingFacetsAction =
  | FetchListingFacetsRequestAction
  | FetchListingFacetsSuccessAction
  | FetchListingFacetsFailureAction;

/**
 * Actions dispatched when the reset listing facets is called.
 */
export interface ResetListingFacetsStateAction extends Action {
  type: typeof actionTypes.RESET_PRODUCT_LISTING_FACETS;
}
