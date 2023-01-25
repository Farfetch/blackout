import * as actionRafflesTypes from './types/rafflesActions.types';
import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers, Reducer } from 'redux';
import { LOGOUT_SUCCESS } from '../users/authentication/actionTypes';
import createReducer, {
  createReducerWithResult,
} from '../helpers/reducerFactory';
import type * as T from './types';
import type { RafflesState } from './types';
import type { StoreState } from '../types';

export const INITIAL_STATE: T.RafflesState = {
  allRaffles: {},
  raffles: {},
  estimations: {},
  participations: {},
  participationCreations: {},
};

const allRafflesReducer = createReducerWithResult(
  'FETCH_RAFFLES',
  { isLoading: false, error: null, result: [] },
  actionTypes,
  true,
);
const allRaffles = (state = INITIAL_STATE.allRaffles, action: AnyAction) => {
  if (actionRafflesTypes.RAFFLES_ACTIONS.includes(action.type)) {
    return {
      ...state,
      [action.meta.hash]: allRafflesReducer(state[action.meta.hash], action),
    };
  }
  return state;
};

const raffleReducer = createReducer(
  'FETCH_RAFFLE',
  { isLoading: false, error: null },
  actionTypes,
);
const raffles = (state = INITIAL_STATE.raffles, action: AnyAction) => {
  if (actionRafflesTypes.RAFFLE_ACTIONS.includes(action.type)) {
    return {
      ...state,
      [action.meta.raffleId]: raffleReducer(
        state[action.meta.raffleId],
        action,
      ),
    };
  }
  return state;
};

const estimationReducer = createReducer(
  'FETCH_RAFFLE_ESTIMATION',
  { isLoading: false, error: null },
  actionTypes,
);
const estimations = (state = INITIAL_STATE.estimations, action: AnyAction) => {
  if (actionRafflesTypes.RAFFLE_ESTIMATION_ACTIONS.includes(action.type)) {
    return {
      ...state,
      [action.meta.raffleId]: estimationReducer(
        state[action.meta.raffleId],
        action,
      ),
    };
  }
  return state;
};

const participationReducer = createReducer(
  ['FETCH_RAFFLE_PARTICIPATION', 'UPDATE_RAFFLE_PARTICIPATION'],
  { isLoading: false, error: null },
  actionTypes,
);
const participations = (
  state = INITIAL_STATE.participations,
  action: AnyAction,
) => {
  if (actionRafflesTypes.RAFFLE_PARTICIPATION_ACTIONS.includes(action.type)) {
    return {
      ...state,
      [action.meta.participationId]: participationReducer(
        state[action.meta.participationId],
        action,
      ),
    };
  }
  return state;
};

const participationCreationReducer = createReducer(
  'CREATE_RAFFLE_PARTICIPATION',
  { isLoading: false, error: null },
  actionTypes,
);
const participationCreations = (
  state = INITIAL_STATE.participationCreations,
  action: AnyAction,
) => {
  if (
    actionRafflesTypes.RAFFLE_PARTICIPATION_CREATION_ACTIONS.includes(
      action.type,
    )
  ) {
    return {
      ...state,
      [action.meta.raffleId]: participationCreationReducer(
        state[action.meta.raffleId],
        action,
      ),
    };
  }
  return state;
};

export const entitiesMapper = {
  [actionTypes.RESET_RAFFLES_STATE]: (
    state: NonNullable<StoreState['entities']>,
  ) => {
    const { raffles, raffleParticipations, raffleEstimations, ...rest } = state;
    return rest;
  },
  [LOGOUT_SUCCESS]: (state: NonNullable<StoreState['entities']>) => {
    if (!state) {
      return state;
    }
    const { raffles, raffleParticipations, raffleEstimations, ...rest } = state;
    return rest;
  },
};

export const getAllRaffles = (state: RafflesState) => state.allRaffles;
export const getRaffles = (state: RafflesState) => state.raffles;
export const getEstimations = (state: RafflesState) => state.estimations;
export const getParticipations = (state: RafflesState) => state.participations;
export const getParticipationCreations = (state: RafflesState) =>
  state.participationCreations;

const reducer = combineReducers({
  allRaffles,
  raffles,
  participations,
  participationCreations,
  estimations,
});

/**
 * Reducer for raffles state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const rafflesReducer: Reducer<T.RafflesState> = (state, action) => {
  if (
    action.type === actionTypes.RESET_RAFFLES_STATE ||
    action.type === LOGOUT_SUCCESS
  ) {
    return reducer(INITIAL_STATE, action);
  }
  return reducer(state, action);
};

export default rafflesReducer;
