import * as actionTypes from '../actionTypes';
import { LOGOUT_SUCCESS } from '../../users/actionTypes';
import {
  mockCreateRaffleParticipationsNormalizedPayload,
  mockFetchRafflesNormalizedPayload,
  mockRaffleEstimationResponse,
  mockRaffleParticipationResponse,
  mockRaffleResponse,
  participationId,
  raffleId,
} from 'tests/__fixtures__/raffles';
import { toBlackoutError } from '@farfetch/blackout-client';
import cloneDeep from 'lodash/cloneDeep';
import reducer, {
  entitiesMapper,
  getAllRaffles,
  getEstimations,
  getParticipationCreations,
  getParticipations,
  getRaffles,
  INITIAL_STATE,
} from '../reducer';
import type { RafflesState } from '../types';

let initialState: RafflesState;

describe('raffles reducer', () => {
  beforeEach(() => {
    initialState = INITIAL_STATE;
  });

  describe('reset handling', () => {
    const mockState = {
      allRaffles: {
        '': {
          isLoading: true,
          error: null,
          result: null,
        },
      },
      raffles: {
        [raffleId]: {
          isLoading: true,
          error: null,
        },
      },
      estimations: {
        [raffleId]: {
          isLoading: true,
          error: null,
        },
      },
      participations: {
        [participationId]: {
          isLoading: true,
          error: null,
        },
      },
      participationCreations: {
        [raffleId]: {
          isLoading: true,
          error: null,
        },
      },
    };

    describe('when its the first time it is invoked and receive an undefined state', () => {
      it('should return the initial state', () => {
        expect(reducer(undefined, { type: 'this_is_a_random_action' })).toEqual(
          initialState,
        );
      });
    });

    describe(`when is a ${actionTypes.RESET_RAFFLES_STATE} action`, () => {
      it('should return the initial state', () => {
        const state = reducer(mockState, {
          type: actionTypes.RESET_RAFFLES_STATE,
        });

        expect(state).toEqual(initialState);
      });
    });

    describe('when is a LOGOUT_SUCCESS action', () => {
      it('should return the initial state', () => {
        expect(reducer(mockState, { type: LOGOUT_SUCCESS })).toEqual(
          initialState,
        );
      });
    });
  });

  describe('allRaffles reducer', () => {
    const expectedError = new Error('fetch all raffles error');

    it(`should handle ${actionTypes.FETCH_RAFFLES_REQUEST} action type`, () => {
      const mockState = cloneDeep(initialState);
      const hash = 'hashRaffleQuery';

      mockState.allRaffles[hash] = {
        isLoading: false,
        error: null,
        result: mockFetchRafflesNormalizedPayload.result,
      };

      const state = reducer(initialState, {
        type: actionTypes.FETCH_RAFFLES_REQUEST,
        meta: { hash },
      });

      expect(state.allRaffles[hash]?.isLoading).toBe(true);
      expect(state.allRaffles[hash]?.error).toBeNull();
    });

    it(`should handle ${actionTypes.FETCH_RAFFLES_SUCCESS} action type`, () => {
      const mockState = cloneDeep(initialState);
      const hash = 'hashRaffleQuery';

      mockState.allRaffles[hash] = {
        isLoading: true,
        error: null,
        result: mockFetchRafflesNormalizedPayload.result,
      };

      const state = reducer(mockState, {
        type: actionTypes.FETCH_RAFFLES_SUCCESS,
        payload: mockFetchRafflesNormalizedPayload,
        meta: { hash },
      });

      expect(state.allRaffles[hash]?.isLoading).toBe(false);
      expect(state.allRaffles[hash]?.error).toBeNull();
      expect(state.allRaffles[hash]?.result).toEqual(
        mockFetchRafflesNormalizedPayload.result,
      );
    });

    it(`should handle ${actionTypes.FETCH_RAFFLES_FAILURE} action type`, () => {
      const mockState = cloneDeep(initialState);
      const hash = 'hashRaffleQuery';

      mockState.allRaffles[hash] = {
        isLoading: true,
        error: null,
        result: mockFetchRafflesNormalizedPayload.result,
      };

      const state = reducer(mockState, {
        type: actionTypes.FETCH_RAFFLES_FAILURE,
        payload: { error: toBlackoutError(expectedError) },
        meta: { hash },
      });

      expect(state.allRaffles[hash]?.isLoading).toBe(false);
      expect(state.allRaffles[hash]?.error).toBe(expectedError);
    });
  });

  describe('raffles reducer', () => {
    const expectedError = new Error('fetch raffles error');

    it(`should handle ${actionTypes.FETCH_RAFFLE_REQUEST} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.raffles[raffleId] = {
        isLoading: false,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.FETCH_RAFFLE_REQUEST,
        meta: { raffleId },
      });

      expect(state.raffles[raffleId]?.isLoading).toBe(true);
      expect(state.raffles[raffleId]?.error).toBeNull();
    });

    it(`should handle ${actionTypes.FETCH_RAFFLE_SUCCESS} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.raffles[raffleId] = {
        isLoading: true,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.FETCH_RAFFLE_SUCCESS,
        payload: mockRaffleResponse,
        meta: { raffleId },
      });

      expect(state.raffles[raffleId]?.isLoading).toBe(false);
      expect(state.raffles[raffleId]?.error).toBeNull();
    });

    it(`should handle ${actionTypes.FETCH_RAFFLE_FAILURE} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.raffles[raffleId] = {
        isLoading: true,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.FETCH_RAFFLE_FAILURE,
        payload: { error: toBlackoutError(expectedError) },
        meta: { raffleId },
      });

      expect(state.raffles[raffleId]?.isLoading).toBe(false);
      expect(state.raffles[raffleId]?.error).toBe(expectedError);
    });
  });

  describe('estimations reducer', () => {
    const expectedError = new Error('fetch raffle estimation error');

    it(`should handle ${actionTypes.FETCH_RAFFLE_ESTIMATION_REQUEST} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.estimations[raffleId] = {
        isLoading: false,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.FETCH_RAFFLE_ESTIMATION_REQUEST,
        meta: { raffleId },
      });

      expect(state.estimations[raffleId]?.isLoading).toBe(true);
      expect(state.estimations[raffleId]?.error).toBeNull();
    });

    it(`should handle ${actionTypes.FETCH_RAFFLE_ESTIMATION_SUCCESS} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.estimations[raffleId] = {
        isLoading: true,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.FETCH_RAFFLE_ESTIMATION_SUCCESS,
        payload: mockRaffleEstimationResponse,
        meta: { raffleId },
      });

      expect(state.estimations[raffleId]?.isLoading).toBe(false);
      expect(state.estimations[raffleId]?.error).toBeNull();
    });

    it(`should handle ${actionTypes.FETCH_RAFFLE_ESTIMATION_FAILURE} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.estimations[raffleId] = {
        isLoading: true,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.FETCH_RAFFLE_ESTIMATION_FAILURE,
        payload: { error: toBlackoutError(expectedError) },
        meta: { raffleId },
      });

      expect(state.estimations[raffleId]?.isLoading).toBe(false);
      expect(state.estimations[raffleId]?.error).toBe(expectedError);
    });
  });

  describe('participations reducer', () => {
    const expectedError = new Error(
      'fetch or update participation creations error',
    );

    it.each([
      actionTypes.FETCH_RAFFLE_PARTICIPATION_REQUEST,
      actionTypes.UPDATE_RAFFLE_PARTICIPATION_REQUEST,
    ])('should handle %s action type', actionType => {
      const mockState = cloneDeep(initialState);

      mockState.participations[raffleId] = {
        isLoading: false,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionType,
        meta: { raffleId, participationId },
      });

      expect(state.participations[participationId]?.isLoading).toBe(true);
      expect(state.participations[participationId]?.error).toBeNull();
    });

    it.each([
      actionTypes.FETCH_RAFFLE_PARTICIPATION_SUCCESS,
      actionTypes.UPDATE_RAFFLE_PARTICIPATION_SUCCESS,
    ])('should handle %s action type', actionType => {
      const mockState = cloneDeep(initialState);

      mockState.participations[raffleId] = {
        isLoading: true,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionType,
        payload: mockRaffleParticipationResponse,
        meta: { raffleId, participationId },
      });

      expect(state.participations[participationId]?.isLoading).toBe(false);
      expect(state.participations[participationId]?.error).toBeNull();
    });

    it.each([
      actionTypes.FETCH_RAFFLE_PARTICIPATION_FAILURE,
      actionTypes.UPDATE_RAFFLE_PARTICIPATION_FAILURE,
    ])('should handle %s action type', actionType => {
      const mockState = cloneDeep(initialState);

      mockState.participations[raffleId] = {
        isLoading: true,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionType,
        payload: { error: toBlackoutError(expectedError) },
        meta: { raffleId, participationId },
      });

      expect(state.participations[participationId]?.isLoading).toBe(false);
      expect(state.participations[participationId]?.error).toBe(expectedError);
    });
  });

  describe('participation creation reducer', () => {
    const expectedError = new Error('fetch participation creation error');

    it(`should handle ${actionTypes.CREATE_RAFFLE_PARTICIPATION_REQUEST} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.participationCreations[raffleId] = {
        isLoading: false,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.CREATE_RAFFLE_PARTICIPATION_REQUEST,
        meta: { raffleId },
      });

      expect(state.participationCreations[raffleId]?.isLoading).toBe(true);
      expect(state.participationCreations[raffleId]?.error).toBeNull();
    });

    it(`should handle ${actionTypes.CREATE_RAFFLE_PARTICIPATION_SUCCESS} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.participationCreations[raffleId] = {
        isLoading: true,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.CREATE_RAFFLE_PARTICIPATION_SUCCESS,
        payload: mockCreateRaffleParticipationsNormalizedPayload,
        meta: { raffleId, participationId },
      });

      expect(state.participationCreations[raffleId]?.isLoading).toBe(false);
      expect(state.participationCreations[raffleId]?.error).toBeNull();
    });

    it(`should handle ${actionTypes.CREATE_RAFFLE_PARTICIPATION_FAILURE} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.participationCreations[raffleId] = {
        isLoading: true,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.CREATE_RAFFLE_PARTICIPATION_FAILURE,
        payload: { error: toBlackoutError(expectedError) },
        meta: { raffleId },
      });

      expect(state.participationCreations[raffleId]?.isLoading).toBe(false);
      expect(state.participationCreations[raffleId]?.error).toBe(expectedError);
    });
  });

  describe('getAllRaffles selector', () => {
    it('should return the state', () => {
      expect(getAllRaffles(initialState)).toBe(initialState.allRaffles);
    });
  });

  describe('getRaffles selector', () => {
    it('should return the state', () => {
      expect(getRaffles(initialState)).toBe(initialState.raffles);
    });
  });

  describe('getEstimations selector', () => {
    it('should return the state', () => {
      expect(getEstimations(initialState)).toBe(initialState.estimations);
    });
  });

  describe('getParticipations selector', () => {
    it('should return the state', () => {
      expect(getParticipations(initialState)).toBe(initialState.participations);
    });
  });

  describe('getParticipationCreations selector', () => {
    it('should return the state', () => {
      expect(getParticipationCreations(initialState)).toBe(
        initialState.participationCreations,
      );
    });
  });

  describe('entitiesMapper', () => {
    describe('reset raffles', () => {
      const entityState = {
        raffles: {
          [raffleId]: mockRaffleResponse,
        },
        raffleParticipations: {},
        raffleEstimations: {},
        entityMock: 'this is a mock entity',
      };
      const expectedResult = { entityMock: 'this is a mock entity' };

      it(`should handle ${actionTypes.RESET_RAFFLES_STATE} action type`, () => {
        expect(
          entitiesMapper[actionTypes.RESET_RAFFLES_STATE](entityState),
        ).toEqual(expectedResult);
      });

      it(`should handle ${LOGOUT_SUCCESS} action type`, () => {
        expect(entitiesMapper[LOGOUT_SUCCESS](entityState)).toEqual(
          expectedResult,
        );
      });
    });
  });
});
