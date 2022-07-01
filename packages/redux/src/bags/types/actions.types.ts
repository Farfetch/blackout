import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type {
  BagItem,
  BlackoutError,
  Brand,
  Category,
  PatchBagItemData,
  PostBagItemData,
} from '@farfetch/blackout-client';
import type { BagNormalized } from '../types';
import type { MerchantEntity, ProductEntity } from '../../entities/types';
import type { NormalizedSchema } from 'normalizr';

type Payload = NormalizedSchema<
  {
    categories?: Record<Category['id'], Category>;
    brands?: Record<Brand['id'], Brand>;
    products: Record<ProductEntity['id'], ProductEntity>;
    merchants?: Record<MerchantEntity['id'], MerchantEntity>;
    bagItems: Record<BagItem['id'], BagItem>;
  },
  BagNormalized
>;

export interface AddBagItemRequestAction extends Action {
  type: typeof actionTypes.ADD_BAG_ITEM_REQUEST;
  meta: { bagId: BagNormalized['id'] } & PostBagItemData;
}
export interface AddBagItemSuccessAction extends Action {
  type: typeof actionTypes.ADD_BAG_ITEM_SUCCESS;
  payload: Payload;
  meta: { bagId: BagNormalized['id'] } & PostBagItemData;
}
export interface AddBagItemFailureAction extends Action {
  type: typeof actionTypes.ADD_BAG_ITEM_FAILURE;
  payload: { error: BlackoutError };
  meta: { bagId: BagNormalized['id'] } & PostBagItemData;
}

/**
 * Actions dispatched when the add bag item request is made.
 */
export type AddBagItemAction =
  | AddBagItemRequestAction
  | AddBagItemSuccessAction
  | AddBagItemFailureAction;

export interface FetchBagRequestAction extends Action {
  type: typeof actionTypes.FETCH_BAG_REQUEST;
}
export interface FetchBagSuccessAction extends Action {
  type: typeof actionTypes.FETCH_BAG_SUCCESS;
  payload: Payload;
}
export interface FetchBagFailureAction extends Action {
  type: typeof actionTypes.FETCH_BAG_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the fetch bag request is made.
 */
export type FetchBagAction =
  | FetchBagRequestAction
  | FetchBagSuccessAction
  | FetchBagFailureAction;

export interface RemoveBagItemRequestAction extends Action {
  type: typeof actionTypes.REMOVE_BAG_ITEM_REQUEST;
  meta: { bagId: BagNormalized['id']; bagItemId: BagItem['id'] };
}
export interface RemoveBagItemSuccessAction extends Action {
  type: typeof actionTypes.REMOVE_BAG_ITEM_SUCCESS;
  payload: Payload;
  meta: { bagId: BagNormalized['id']; bagItemId: BagItem['id'] };
}
export interface RemoveBagItemFailureAction extends Action {
  type: typeof actionTypes.REMOVE_BAG_ITEM_FAILURE;
  payload: { error: BlackoutError };
  meta: { bagId: BagNormalized['id']; bagItemId: BagItem['id'] };
}

/**
 * Actions dispatched when the remove bag item request is made.
 */
export type RemoveBagItemAction =
  | RemoveBagItemRequestAction
  | RemoveBagItemSuccessAction
  | RemoveBagItemFailureAction;

export interface UpdateBagItemRequestAction extends Action {
  type: typeof actionTypes.UPDATE_BAG_ITEM_REQUEST;
  meta: {
    bagId: BagNormalized['id'];
    bagItemId: BagItem['id'];
  } & PatchBagItemData;
}
export interface UpdateBagItemSuccessAction extends Action {
  type: typeof actionTypes.UPDATE_BAG_ITEM_SUCCESS;
  payload: Payload;
  meta: {
    bagId: BagNormalized['id'];
    bagItemId: BagItem['id'];
  } & PatchBagItemData;
}
export interface UpdateBagItemFailureAction extends Action {
  type: typeof actionTypes.UPDATE_BAG_ITEM_FAILURE;
  payload: { error: BlackoutError };
  meta: {
    bagId: BagNormalized['id'];
    bagItemId: BagItem['id'];
  } & PatchBagItemData;
}

/**
 * Actions dispatched when the remove bag item request is made.
 */
export type UpdateBagItemAction =
  | UpdateBagItemRequestAction
  | UpdateBagItemSuccessAction
  | UpdateBagItemFailureAction;

export interface ResetBagStateAction extends Action {
  type: typeof actionTypes.RESET_BAG_STATE;
  payload: { fieldsToReset: string[] | undefined };
}

export interface ResetBagEntitiesAction extends Action {
  type: typeof actionTypes.RESET_BAG_ENTITIES;
}

export type ResetBagAction = ResetBagStateAction | ResetBagEntitiesAction;
