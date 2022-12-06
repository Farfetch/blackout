import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type {
  BlackoutError,
  Brand,
  Category,
  ProductCategory,
  SharedWishlist,
} from '@farfetch/blackout-client';
import type {
  MerchantEntity,
  ProductEntity,
  SharedWishlistItemEntity,
} from '../../entities/types';
import type { NormalizedSchema } from 'normalizr';
import type { SharedWishlistState } from './state.types';

type SharedWishlistNormalizedPayload = NormalizedSchema<
  {
    categories?: Record<Category['id'], ProductCategory>;
    brands?: Record<Brand['id'], Brand>;
    products: Record<ProductEntity['id'], ProductEntity>;
    merchants: Record<MerchantEntity['id'], MerchantEntity>;
    sharedWishlist: Record<SharedWishlist['id'], SharedWishlist>;
    sharedWishlistItems: Record<
      SharedWishlistItemEntity['id'],
      SharedWishlistItemEntity
    >;
  },
  SharedWishlistState['result']
>;

// ===== Shared Wishlist =====

//
// Create shared wishlist
//
export interface CreateSharedWishlistFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.CREATE_SHARED_WISHLIST_FAILURE;
}

export interface CreateSharedWishlistRequestAction extends Action {
  type: typeof actionTypes.CREATE_SHARED_WISHLIST_REQUEST;
}

export interface CreateSharedWishlistSuccessAction extends Action {
  payload: SharedWishlistNormalizedPayload;
  type: typeof actionTypes.CREATE_SHARED_WISHLIST_SUCCESS;
}

export type CreateSharedWishlistAction =
  | CreateSharedWishlistFailureAction
  | CreateSharedWishlistRequestAction
  | CreateSharedWishlistSuccessAction;

//
// Fetch shared wishlist
//
export interface FetchSharedWishlistFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_SHARED_WISHLIST_FAILURE;
}

export interface FetchSharedWishlistRequestAction extends Action {
  type: typeof actionTypes.FETCH_SHARED_WISHLIST_REQUEST;
}

export interface FetchSharedWishlistSuccessAction extends Action {
  payload: SharedWishlistNormalizedPayload;
  type: typeof actionTypes.FETCH_SHARED_WISHLIST_SUCCESS;
}

export type FetchSharedWishlistAction =
  | FetchSharedWishlistFailureAction
  | FetchSharedWishlistRequestAction
  | FetchSharedWishlistSuccessAction;

//
// Remove shared wishlist
//
export interface RemoveSharedWishlistFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.REMOVE_SHARED_WISHLIST_FAILURE;
}

export interface RemoveSharedWishlistRequestAction extends Action {
  type: typeof actionTypes.REMOVE_SHARED_WISHLIST_REQUEST;
}

export interface RemoveSharedWishlistSuccessAction extends Action {
  type: typeof actionTypes.REMOVE_SHARED_WISHLIST_SUCCESS;
}

export type RemoveSharedWishlistAction =
  | RemoveSharedWishlistFailureAction
  | RemoveSharedWishlistRequestAction
  | RemoveSharedWishlistSuccessAction;

//
// Update shared wishlist
//
export interface UpdateSharedWishlistFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.UPDATE_SHARED_WISHLIST_FAILURE;
}

export interface UpdateSharedWishlistRequestAction extends Action {
  type: typeof actionTypes.UPDATE_SHARED_WISHLIST_REQUEST;
}

export interface UpdateSharedWishlistSuccessAction extends Action {
  payload: SharedWishlistNormalizedPayload;
  type: typeof actionTypes.UPDATE_SHARED_WISHLIST_SUCCESS;
}

export type UpdateSharedWishlistAction =
  | UpdateSharedWishlistFailureAction
  | UpdateSharedWishlistRequestAction
  | UpdateSharedWishlistSuccessAction;

export interface ResetSharedWishlistStateAction extends Action {
  payload: { fieldsToReset?: string[] };
  type: typeof actionTypes.RESET_SHARED_WISHLIST_STATE;
}

export interface ResetSharedWishlistEntitiesAction extends Action {
  type: typeof actionTypes.RESET_SHARED_WISHLIST_ENTITIES;
}

export type ResetSharedWishlistAction =
  | ResetSharedWishlistStateAction
  | ResetSharedWishlistEntitiesAction;
