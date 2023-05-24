import type * as actionTypes from '../actionTypes.js';
import type { Action } from 'redux';
import type {
  BagItem,
  BagPromocodesInformation,
  BlackoutError,
  Brand,
  Category,
  JSONValue,
  PatchBagItemData,
  PostBagItemData,
  ProductCategory,
} from '@farfetch/blackout-client';
import type { BagNormalized } from '../types/index.js';
import type {
  MerchantEntity,
  ProductEntity,
} from '../../entities/types/index.js';
import type { NormalizedSchema } from 'normalizr';

export type BagItemActionMetadata = {
  from?: string;
  affiliation?: string;
  coupon?: string;
  position?: number;
  value?: number;
} & Record<string, JSONValue>;

type Payload = NormalizedSchema<
  {
    categories?: Record<Category['id'], ProductCategory>;
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

export interface FetchBagOperationRequestAction extends Action {
  type: typeof actionTypes.FETCH_BAG_OPERATION_REQUEST;
}
export interface FetchBagOperationSuccessAction extends Action {
  type: typeof actionTypes.FETCH_BAG_OPERATION_SUCCESS;
  payload: Payload;
}
export interface FetchBagOperationFailureAction extends Action {
  type: typeof actionTypes.FETCH_BAG_OPERATION_FAILURE;
  payload: { error: BlackoutError };
}
/**
 * Actions dispatched when the fetch bag operation request is made.
 */
export type FetchBagOperationAction =
  | FetchBagRequestAction
  | FetchBagSuccessAction
  | FetchBagFailureAction;

export interface ResetBagOperationsEntitiesAction extends Action {
  type: typeof actionTypes.RESET_BAG_OPERATIONS_ENTITIES;
}

export interface ResetBagOperationsStateAction extends Action {
  type: typeof actionTypes.RESET_BAG_OPERATIONS_STATE;
}

export type ResetBagOperationsAction =
  | ResetBagOperationsStateAction
  | ResetBagOperationsEntitiesAction;

export interface SetBagPromocodesRequestAction extends Action {
  type: typeof actionTypes.SET_BAG_PROMOCODES_REQUEST;
}
export interface SetBagPromocodesSuccessAction extends Action {
  type: typeof actionTypes.SET_BAG_PROMOCODES_SUCCESS;
  payload: BagPromocodesInformation;
}
export interface SetBagPromocodesFailureAction extends Action {
  type: typeof actionTypes.SET_BAG_PROMOCODES_FAILURE;
  payload: { error: BlackoutError };
}
/**
 * Actions dispatched when the set bag promocodes request is made.
 */
export type SetBagPromocodesAction =
  | SetBagPromocodesRequestAction
  | SetBagPromocodesSuccessAction
  | SetBagPromocodesFailureAction;

export interface ResetBagPromocodesStateAction extends Action {
  type: typeof actionTypes.RESET_BAG_PROMOCODES_STATE;
}
