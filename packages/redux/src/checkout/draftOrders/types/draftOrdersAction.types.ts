import * as actionTypes from '../actionTypes.js';

/**
 * These actions are to be used to create draft order reducer
 */
export const CREATE_DRAFT_ORDER_ACTIONS = [
  actionTypes.CREATE_DRAFT_ORDER_REQUEST,
  actionTypes.CREATE_DRAFT_ORDER_SUCCESS,
  actionTypes.CREATE_DRAFT_ORDER_FAILURE,
];

/**
 * These actions are to be used to fetch draft order reducer
 */
export const DRAFT_ORDER_ACTIONS = [
  actionTypes.FETCH_DRAFT_ORDER_REQUEST,
  actionTypes.FETCH_DRAFT_ORDER_SUCCESS,
  actionTypes.FETCH_DRAFT_ORDER_FAILURE,
];

/**
 * These actions are to be used to update draft order and draft order item reducer
 */
export const UPDATE_DRAFT_ORDER_ACTIONS = [
  actionTypes.UPDATE_DRAFT_ORDER_REQUEST,
  actionTypes.UPDATE_DRAFT_ORDER_SUCCESS,
  actionTypes.UPDATE_DRAFT_ORDER_FAILURE,
  actionTypes.UPDATE_DRAFT_ORDER_ITEM_REQUEST,
  actionTypes.UPDATE_DRAFT_ORDER_ITEM_SUCCESS,
  actionTypes.UPDATE_DRAFT_ORDER_ITEM_FAILURE,
];

/**
 * These actions are to be used to get draft orders reducer
 */
export const DRAFT_ORDERS_ACTIONS = [
  actionTypes.FETCH_DRAFT_ORDERS_REQUEST,
  actionTypes.FETCH_DRAFT_ORDERS_SUCCESS,
  actionTypes.FETCH_DRAFT_ORDERS_FAILURE,
];

/**
 * These actions are to be used to delete draft order and draft order item reducer
 */
export const RMEOVE_DRAFT_ORDERS_ACTIONS = [
  actionTypes.REMOVE_DRAFT_ORDER_REQUEST,
  actionTypes.REMOVE_DRAFT_ORDER_SUCCESS,
  actionTypes.REMOVE_DRAFT_ORDER_FAILURE,
  actionTypes.REMOVE_DRAFT_ORDER_ITEM_REQUEST,
  actionTypes.REMOVE_DRAFT_ORDER_ITEM_SUCCESS,
  actionTypes.REMOVE_DRAFT_ORDER_ITEM_FAILURE,
];
