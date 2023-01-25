import { createSelector } from 'reselect';
import { buildQueryStringFromObject as generateRafflesHash } from '../helpers';
import {
  getAllRaffles as getAllRafflesFromReducer,
  getEstimations,
  getParticipationCreations,
  getParticipations,
  getRaffles as getRafflesFromReducer,
} from './reducer';
import { getEntities, getEntityById } from '../entities/selectors';
import type { DetailedRaffle } from './types/raffles.types';
import type {
  Raffle,
  RaffleParticipation,
  RafflesQuery,
} from '@farfetch/blackout-client';
import type { RafflesState } from './types';
import type { StoreState } from '../types/storeState.types';

const getRaffleEntities = (state: StoreState) => getEntities(state, 'raffles');
const getRaffleParticipationEntities = (state: StoreState) =>
  getEntities(state, 'raffleParticipations');

/**
 * Returns all raffle participations from state.
 *
 * @param state - Application state
 *
 * @returns All Raffle Participations entities in the state.
 */
const getRaffleParticipations: (state: StoreState) => RaffleParticipation[] =
  createSelector([getRaffleParticipationEntities], raffleParticipations =>
    Object.values(raffleParticipations || {}),
  );

/**
 * Returns all raffles from state that might have been loaded by different
 * fetch raffles requests. If you want the raffles for a specific fetch raffles
 * request, use the `getRafflesResult` selector instead.
 *
 * @param state - Application state
 *
 * @returns All Raffle entities in the state.
 */
export const getAllRaffles: (state: StoreState) => Raffle[] = createSelector(
  [getRaffleEntities],
  raffles => Object.values(raffles || {}),
);

/**
 * Returns the result for a specific fetch raffles request.
 *
 * @param state - Application state
 * @param query - Query parameters used on the request.
 *
 * @returns - All raffles for a specific fetch request, if any.
 */
export const getRafflesResult: (
  state: StoreState,
  query?: RafflesQuery,
) => Raffle[] | undefined = createSelector(
  [
    getRaffleEntities,
    (state: StoreState, query?: RafflesQuery) => ({ state, query }),
  ],
  (rafflesEntities, props) => {
    const rafflesHash = generateRafflesHash(props?.query || {});
    const allRaffles = getAllRafflesFromReducer(
      props.state.raffles as RafflesState,
    );
    const raffles = allRaffles[rafflesHash];
    return raffles?.result?.entries
      .map((raffleId: Raffle['id']) => rafflesEntities?.[raffleId])
      .filter(Boolean) as Raffle[];
  },
);

/**
 * Returns a specific raffle by its id.
 *
 * @param state   - Application state.
 * @param raffleId - Id of the raffle to get.
 *
 * @returns Raffle entity or undefined if not found.
 */
export const getRaffle = (state: StoreState, raffleId: Raffle['id']) =>
  getEntityById(state, 'raffles', raffleId);

/**
 * Returns the estimation for a raffle.
 *
 * @param state - Application state
 * @param raffleId - Id of the raffle to get estimation from.
 *
 * @returns The raffle estimation if it exists.
 */
export const getRaffleEstimation = (
  state: StoreState,
  raffleId: Raffle['id'],
) => getEntityById(state, 'raffleEstimations', raffleId);

/**
 * Returns a raffle participation.
 *
 * @param state - Application state
 * @param participationId - Id of the raffle participation to get.
 *
 * @returns The raffle participation if found, otherwise undefined.
 */
export const getRaffleParticipation = (
  state: StoreState,
  participationId: RaffleParticipation['id'],
) => getEntityById(state, 'raffleParticipations', participationId);

/**
 * Returns the participation for a specific raffle.
 *
 * @param state - Application state
 * @param raffleId - Id of the raffle to get the participation from.
 *
 * @returns The participation for the raffle if found, otherwise undefined.
 */
export const getRaffleParticipationForRaffle: (
  state: StoreState,
  raffleId: Raffle['id'],
) => RaffleParticipation | undefined = createSelector(
  [
    getRaffleParticipations,
    (state: StoreState, raffleId: Raffle['id']) => raffleId,
  ],
  (raffleParticipations, raffleId) =>
    raffleParticipations.find(
      participation => participation.raffleId === raffleId,
    ),
);

/**
 * Returns a raffle with estimation and participation details.
 *
 * @param state - Application state.
 * @param raffleId - Id of the raffle to get the details from.
 *
 * @returns A raffle entity enhanced with an estimation and/or a participation entities if found.
 */
export const getDetailedRaffle: (
  state: StoreState,
  raffleId: Raffle['id'],
) => DetailedRaffle | undefined = createSelector(
  [getRaffle, getRaffleEstimation, getRaffleParticipationForRaffle],
  (raffle, estimation, participation) => {
    if (!raffle) {
      return;
    }

    return {
      ...raffle,
      estimation,
      participation,
    };
  },
);

/**
 * Returns the loading status for a specific fetch raffles request.
 *
 * @param state - Application state.
 * @param query - Query parameters used on the request.
 *
 * @returns Boolean indicating if the request is loading or not.
 */
export const areRafflesLoading = (state: StoreState, query?: RafflesQuery) => {
  const rafflesHash = generateRafflesHash(query || {});
  const allRaffles = getAllRafflesFromReducer(state.raffles as RafflesState);
  return !!allRaffles[rafflesHash]?.isLoading;
};

/**
 * Returns the error for a specific fetch raffles request.
 *
 * @param state - Application state.
 * @param query - Query parameters used on the request.
 *
 * @returns The error for the fetch raffles request, if any.
 */
export const getRafflesError = (state: StoreState, query?: RafflesQuery) => {
  const rafflesHash = generateRafflesHash(query || {});
  const raffleError = getAllRafflesFromReducer(state.raffles as RafflesState)[
    rafflesHash
  ];
  return raffleError?.error;
};

/**
 * Return the loading status for the fetch request of a specific raffle.
 *
 * @param state - Application state.
 * @param raffleId - Id of the raffle to get the loading status.
 *
 * @returns Boolean indicating if the request is loading or not.
 */
export const isRaffleLoading = (state: StoreState, raffleId: Raffle['id']) =>
  !!getRafflesFromReducer(state.raffles as RafflesState)[raffleId]?.isLoading;

/**
 * Returns the error for the fetch request of a specific raffle.
 *
 * @param state - Application state.
 * @param raffleId - Id of the raffle to get the error.
 *
 * @returns Error for the fetch raffle request, if any.
 */
export const getRaffleError = (state: StoreState, raffleId: Raffle['id']) =>
  getRafflesFromReducer(state.raffles as RafflesState)[raffleId]?.error;

/**
 * Returns the loading status for the fetch estimation request of a specific raffle.
 *
 * @param state - Application state.
 * @param raffleId - Id of the raffle to get the loading estimation status.
 *
 * @returns Boolean indicating if the request is loading or not.
 */
export const isRaffleEstimationLoading = (
  state: StoreState,
  raffleId: Raffle['id'],
) => !!getEstimations(state.raffles as RafflesState)[raffleId]?.isLoading;

/**
 * Returns the error for the fetch estimation request of a specific raffle.
 *
 * @param state - Application state.
 * @param raffleId - Id of the raffle to get the error.
 *
 * @returns Error for the fetch raffle estimation request, if any.
 */
export const getRaffleEstimationError = (
  state: StoreState,
  raffleId: Raffle['id'],
) => getEstimations(state.raffles as RafflesState)[raffleId]?.error;

/**
 * Returns the loading status for the fetch request of a specific raffle participation.
 *
 * @param state - Application state.
 * @param participationId - Id of the raffle participation to get the loading status.
 *
 * @returns Boolean indicating if the request is loading or not.
 */
export const isRaffleParticipationLoading = (
  state: StoreState,
  participationId: RaffleParticipation['id'],
) =>
  !!getParticipations(state.raffles as RafflesState)[participationId]
    ?.isLoading;

/**
 * Returns the error for the fetch request of a specific raffle participation.
 *
 * @param state - Application state.
 * @param participationId - Id of the raffle participation to get the error.
 *
 * @returns Error for the fetch raffle participation request, if any.
 */
export const getRaffleParticipationError = (
  state: StoreState,
  participationId: RaffleParticipation['id'],
) => getParticipations(state.raffles as RafflesState)[participationId]?.error;

/**
 * Returns the loading status for the create participation request for a specific raffle.
 *
 * @param state - Application state.
 * @param raffleId - Id of the raffle to get the loading status.
 *
 * @returns Boolean indicating if the request is loading or not.
 */
export const isRaffleParticipationCreationLoading = (
  state: StoreState,
  raffleId: Raffle['id'],
) =>
  !!getParticipationCreations(state.raffles as RafflesState)[raffleId]
    ?.isLoading;

/**
 * Returns the error for the create participation request for a specific raffle.
 *
 * @param state - Application state.
 * @param raffleId - Id of the raffle to get the create participation error.
 *
 * @returns Error for the create raffle participation, if any.
 */
export const getRaffleParticipationCreationError = (
  state: StoreState,
  raffleId: Raffle['id'],
) => getParticipationCreations(state.raffles as RafflesState)[raffleId]?.error;
