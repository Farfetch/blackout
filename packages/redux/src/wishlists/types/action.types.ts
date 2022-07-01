import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type {
  BlackoutError,
  Brand,
  Category,
  PostWishlistItemData,
  WishlistItem,
  WishlistSet,
} from '@farfetch/blackout-client';
import type {
  MerchantEntity,
  ProductEntity,
  WishlistSetEntities,
} from '../../entities/types';
import type { NormalizedSchema } from 'normalizr';
import type { WishlistsState } from './state.types';

export type WishlistNormalizedPayload = NormalizedSchema<
  {
    brands: Record<Brand['id'], Brand>;
    categories: Record<Category['id'], Category>;
    wishlistItems: Record<WishlistItem['id'], WishlistItem>;
    merchants: Record<MerchantEntity['id'], MerchantEntity>;
    products: Record<ProductEntity['id'], ProductEntity>;
  },
  WishlistsState['result']
>;

export type WishlistSetsNormalizedPayload = NormalizedSchema<
  { wishlistSets: WishlistSetEntities },
  Array<WishlistSet['setId']>
>;

export type WishlistSetNormalizedPayload = NormalizedSchema<
  { wishlistSets: WishlistSetEntities },
  WishlistSet['setId']
>;

// ===== Wishlist =====

//
// Fetch wishlist
//
export interface FetchWishlistFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_WISHLIST_FAILURE;
}

export interface FetchWishlistRequestAction extends Action {
  type: typeof actionTypes.FETCH_WISHLIST_REQUEST;
}

export interface FetchWishlistSuccessAction extends Action {
  payload: WishlistNormalizedPayload;
  type: typeof actionTypes.FETCH_WISHLIST_SUCCESS;
}

export type FetchWishlistAction =
  | FetchWishlistFailureAction
  | FetchWishlistRequestAction
  | FetchWishlistSuccessAction;

export type PostWishlistItemActionData = PostWishlistItemData &
  PostWishlistItemActionAnalyticsData;

export type PostWishlistItemActionAnalyticsData = {
  affiliation?: string;
  coupon?: string;
  from: string;
  position?: number;
  value?: number;
};

//
// Add wishlist item
//
export interface AddWishlistItemFailureAction extends Action {
  meta: {
    productId: ProductEntity['id'];
  };
  payload: { error: BlackoutError };
  type: typeof actionTypes.ADD_WISHLIST_ITEM_FAILURE;
}

export interface AddWishlistItemRequestAction extends Action {
  meta: {
    productId: ProductEntity['id'];
  };
  type: typeof actionTypes.ADD_WISHLIST_ITEM_REQUEST;
}

export interface AddWishlistItemSuccessAction extends Action {
  meta: {
    productId: ProductEntity['id'];
  };
  payload: WishlistNormalizedPayload;
  type: typeof actionTypes.ADD_WISHLIST_ITEM_SUCCESS;
}

export type AddWishlistItemAction =
  | AddWishlistItemFailureAction
  | AddWishlistItemRequestAction
  | AddWishlistItemSuccessAction;

//
// Remove wishlist item
//
export interface RemoveWishlistItemFailureAction extends Action {
  meta: {
    productId: ProductEntity['id'] | undefined;
    wishlistItemId: WishlistItem['id'];
  };
  payload: { error: BlackoutError };
  type: typeof actionTypes.REMOVE_WISHLIST_ITEM_FAILURE;
}

export interface RemoveWishlistItemRequestAction extends Action {
  meta: {
    productId: ProductEntity['id'] | undefined;
    wishlistItemId: WishlistItem['id'];
  };
  type: typeof actionTypes.REMOVE_WISHLIST_ITEM_REQUEST;
}

export interface RemoveWishlistItemSuccessAction extends Action {
  meta: {
    productId: ProductEntity['id'] | undefined;
    wishlistItemId: WishlistItem['id'];
  };
  payload: WishlistNormalizedPayload;
  type: typeof actionTypes.REMOVE_WISHLIST_ITEM_SUCCESS;
}

export type RemoveWishlistItemAction =
  | RemoveWishlistItemFailureAction
  | RemoveWishlistItemRequestAction
  | RemoveWishlistItemSuccessAction;

//
// Update wishlist item
//
export interface UpdateWishlistItemFailureAction extends Action {
  meta: {
    productId: ProductEntity['id'] | undefined;
    wishlistItemId: WishlistItem['id'];
  };
  payload: { error: BlackoutError };
  type: typeof actionTypes.UPDATE_WISHLIST_ITEM_FAILURE;
}

export interface UpdateWishlistItemRequestAction extends Action {
  meta: {
    productId: ProductEntity['id'] | undefined;
    wishlistItemId: WishlistItem['id'];
  };
  type: typeof actionTypes.UPDATE_WISHLIST_ITEM_REQUEST;
}

export interface UpdateWishlistItemSuccessAction extends Action {
  meta: {
    productId: ProductEntity['id'] | undefined;
    wishlistItemId: WishlistItem['id'];
  };
  payload: WishlistNormalizedPayload;
  type: typeof actionTypes.UPDATE_WISHLIST_ITEM_SUCCESS;
}

export type UpdateWishlistItemAction =
  | UpdateWishlistItemFailureAction
  | UpdateWishlistItemRequestAction
  | UpdateWishlistItemSuccessAction;

export interface ResetWishlistStateAction extends Action {
  payload: { fieldsToReset?: string[] };
  type: typeof actionTypes.RESET_WISHLIST_STATE;
}

export interface ResetWishlistEntitiesAction extends Action {
  type: typeof actionTypes.RESET_WISHLIST_ENTITIES;
}

// ===== Wishlist sets =====

//
// Fetch wishlist sets
//
export interface FetchWishlistSetsFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_WISHLIST_SETS_FAILURE;
}

export interface FetchWishlistSetsRequestAction extends Action {
  type: typeof actionTypes.FETCH_WISHLIST_SETS_REQUEST;
}

export interface FetchWishlistSetsSuccessAction extends Action {
  payload: WishlistSetsNormalizedPayload;
  type: typeof actionTypes.FETCH_WISHLIST_SETS_SUCCESS;
}

export type FetchWishlistSetsAction =
  | FetchWishlistSetsRequestAction
  | FetchWishlistSetsFailureAction
  | FetchWishlistSetsSuccessAction;

//
// Add wishlist set
//
export interface AddWishlistSetFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.ADD_WISHLIST_SET_FAILURE;
}

export interface AddWishlistSetRequestAction extends Action {
  type: typeof actionTypes.ADD_WISHLIST_SET_REQUEST;
}

export interface AddWishlistSetSuccessAction extends Action {
  payload: WishlistSetNormalizedPayload;
  type: typeof actionTypes.ADD_WISHLIST_SET_SUCCESS;
}

export type AddWishlistSetAction =
  | AddWishlistSetRequestAction
  | AddWishlistSetFailureAction
  | AddWishlistSetSuccessAction;

//
// Fetch wishlist set
//
export interface FetchWishlistSetFailureAction extends Action {
  meta: { wishlistSetId: WishlistSet['setId'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_WISHLIST_SET_FAILURE;
}

export interface FetchWishlistSetRequestAction extends Action {
  meta: { wishlistSetId: WishlistSet['setId'] };
  type: typeof actionTypes.FETCH_WISHLIST_SET_REQUEST;
}

export interface FetchWishlistSetSuccessAction extends Action {
  meta: { wishlistSetId: WishlistSet['setId'] };
  payload: WishlistSetNormalizedPayload;
  type: typeof actionTypes.FETCH_WISHLIST_SET_SUCCESS;
}

export type FetchWishlistSetAction =
  | FetchWishlistSetRequestAction
  | FetchWishlistSetFailureAction
  | FetchWishlistSetSuccessAction;

//
// Remove wishlist set
//
export interface RemoveWishlistSetFailureAction extends Action {
  meta: { wishlistSetId: WishlistSet['setId'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.REMOVE_WISHLIST_SET_FAILURE;
}

export interface RemoveWishlistSetRequestAction extends Action {
  meta: { wishlistSetId: WishlistSet['setId'] };
  type: typeof actionTypes.REMOVE_WISHLIST_SET_REQUEST;
}

export interface RemoveWishlistSetSuccessAction extends Action {
  meta: { wishlistSetId: WishlistSet['setId'] };
  type: typeof actionTypes.REMOVE_WISHLIST_SET_SUCCESS;
}

export type RemoveWishlistSetAction =
  | RemoveWishlistSetRequestAction
  | RemoveWishlistSetFailureAction
  | RemoveWishlistSetSuccessAction;

//
// Update wishlist set
//
export interface UpdateWishlistSetFailureAction extends Action {
  meta: { wishlistSetId: WishlistSet['setId'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.UPDATE_WISHLIST_SET_FAILURE;
}

export interface UpdateWishlistSetRequestAction extends Action {
  meta: { wishlistSetId: WishlistSet['setId'] };
  type: typeof actionTypes.UPDATE_WISHLIST_SET_REQUEST;
}

export interface UpdateWishlistSetSuccessAction extends Action {
  meta: { wishlistSetId: WishlistSet['setId'] };
  type: typeof actionTypes.UPDATE_WISHLIST_SET_SUCCESS;
}

export type UpdateWishlistSetAction =
  | UpdateWishlistSetRequestAction
  | UpdateWishlistSetFailureAction
  | UpdateWishlistSetSuccessAction;

export interface ResetWishlistSetsStateAction extends Action {
  payload: { fieldsToReset?: string[] };
  type: typeof actionTypes.RESET_WISHLIST_SETS_STATE;
}

export interface ResetWishlistSetsEntitiesAction extends Action {
  type: typeof actionTypes.RESET_WISHLIST_SETS_ENTITIES;
}
