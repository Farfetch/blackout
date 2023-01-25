import * as actionTypes from '../actionTypes';

/**
 * These actions are to be used to create raffles reducer
 */
export const RAFFLES_ACTIONS = [
  actionTypes.FETCH_RAFFLES_REQUEST,
  actionTypes.FETCH_RAFFLES_SUCCESS,
  actionTypes.FETCH_RAFFLES_FAILURE,
];

/**
 * These actions are to be used to create raffle reducer
 */
export const RAFFLE_ACTIONS = [
  actionTypes.FETCH_RAFFLE_REQUEST,
  actionTypes.FETCH_RAFFLE_SUCCESS,
  actionTypes.FETCH_RAFFLE_FAILURE,
];

/**
 * These actions are to be used to create raffle participation reducer
 */
export const RAFFLE_PARTICIPATION_ACTIONS = [
  actionTypes.FETCH_RAFFLE_PARTICIPATION_REQUEST,
  actionTypes.UPDATE_RAFFLE_PARTICIPATION_REQUEST,
  actionTypes.FETCH_RAFFLE_PARTICIPATION_SUCCESS,
  actionTypes.UPDATE_RAFFLE_PARTICIPATION_SUCCESS,
  actionTypes.FETCH_RAFFLE_PARTICIPATION_FAILURE,
  actionTypes.UPDATE_RAFFLE_PARTICIPATION_FAILURE,
];

/**
 * These actions are to be used to create raffle participation creation reducer
 */
export const RAFFLE_PARTICIPATION_CREATION_ACTIONS = [
  actionTypes.CREATE_RAFFLE_PARTICIPATION_REQUEST,
  actionTypes.CREATE_RAFFLE_PARTICIPATION_FAILURE,
  actionTypes.CREATE_RAFFLE_PARTICIPATION_SUCCESS,
];

/**
 * These actions are to be used to create raffle estimation reducer
 */
export const RAFFLE_ESTIMATION_ACTIONS = [
  actionTypes.FETCH_RAFFLE_ESTIMATION_REQUEST,
  actionTypes.FETCH_RAFFLE_ESTIMATION_SUCCESS,
  actionTypes.FETCH_RAFFLE_ESTIMATION_FAILURE,
];
