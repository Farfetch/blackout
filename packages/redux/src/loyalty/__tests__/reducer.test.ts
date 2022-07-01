import * as actionTypes from '../actionTypes';
import { LOGOUT_SUCCESS } from '../../users/authentication/actionTypes';
import reducer, * as fromReducer from '../reducer';
import type { State } from '../types';

let initialState: State;
const subAreas = {
  programs: {},
  membership: {},
  replacements: {},
  converts: {},
  statements: {},
};

describe('loyalty reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('initial state', () => {
    it.each([
      'programs',
      'membership',
      'replacements',
      'converts',
      'statements',
    ])('should return the initial state of %s', subArea => {
      const state = fromReducer.INITIAL_STATE[subArea as keyof typeof subAreas];

      expect(state).toEqual(initialState[subArea as keyof typeof subAreas]);
    });

    it('should return the initial state when is a LOGOUT_SUCCESS action', () => {
      expect(
        reducer(undefined, {
          payload: {},
          type: LOGOUT_SUCCESS,
        }),
      ).toEqual(initialState);
    });
  });

  describe('action request', () => {
    it.each([
      [actionTypes.FETCH_PROGRAMS_REQUEST, 'programs'],
      [
        actionTypes.CREATE_PROGRAM_MEMBERSHIP_REPLACEMENT_REQUEST,
        'replacements',
      ],
      [actionTypes.CREATE_PROGRAM_MEMBERSHIP_CONVERT_REQUEST, 'converts'],
      [actionTypes.FETCH_PROGRAM_MEMBERSHIP_STATEMENTS_REQUEST, 'statements'],
    ])('should handle %s action type', (actionType, subArea) => {
      const expectedResult = {
        error: initialState[subArea as keyof typeof subAreas].error,
        isLoading: true,
      };

      expect(
        reducer(undefined, {
          type: actionType,
        })[subArea as keyof typeof subAreas],
      ).toEqual(expectedResult);
    });

    it.each([
      [actionTypes.FETCH_PROGRAM_USERS_MEMBERSHIP_REQUEST, 'membership'],
      [actionTypes.CREATE_PROGRAM_MEMBERSHIP_REQUEST, 'membership'],
    ])('should handle %s action type', (actionType, subArea) => {
      const expectedResult = {
        ...initialState[subArea as keyof typeof subAreas],
        error: initialState[subArea as keyof typeof subAreas].error,
        isLoading: true,
      };

      expect(
        reducer(undefined, {
          type: actionType,
        })[subArea as keyof typeof subAreas],
      ).toEqual(expectedResult);
    });
  });

  describe('action success', () => {
    it.each([
      [actionTypes.FETCH_PROGRAMS_SUCCESS, 'programs'],
      [actionTypes.FETCH_PROGRAM_USERS_MEMBERSHIP_SUCCESS, 'membership'],
      [actionTypes.CREATE_PROGRAM_MEMBERSHIP_SUCCESS, 'membership'],
      [
        actionTypes.CREATE_PROGRAM_MEMBERSHIP_REPLACEMENT_SUCCESS,
        'replacements',
      ],
      [actionTypes.CREATE_PROGRAM_MEMBERSHIP_CONVERT_SUCCESS, 'converts'],
      [actionTypes.FETCH_PROGRAM_MEMBERSHIP_STATEMENTS_SUCCESS, 'statements'],
    ])('should handle %s action type', (actionType, subArea) => {
      const expectedResult = {
        ...initialState[subArea as keyof typeof subAreas],
        result: 'foo',
      };

      expect(
        reducer(undefined, {
          payload: { result: 'foo' },
          type: actionType,
        })[subArea as keyof typeof subAreas],
      ).toEqual(expectedResult);
    });
  });

  describe('action failure', () => {
    it.each([
      [actionTypes.FETCH_PROGRAMS_FAILURE, 'programs'],
      [
        actionTypes.CREATE_PROGRAM_MEMBERSHIP_REPLACEMENT_FAILURE,
        'replacements',
      ],
      [actionTypes.CREATE_PROGRAM_MEMBERSHIP_CONVERT_FAILURE, 'converts'],
      [actionTypes.FETCH_PROGRAM_MEMBERSHIP_STATEMENTS_FAILURE, 'statements'],
    ])('should handle %s action type', (actionType, subArea) => {
      const expectedResult = {
        isLoading: initialState[subArea as keyof typeof subAreas].isLoading,
        error: 'error',
      };

      expect(
        reducer(undefined, {
          payload: { error: 'error' },
          type: actionType,
        })[subArea as keyof typeof subAreas],
      ).toEqual(expectedResult);
    });

    it.each([
      [actionTypes.FETCH_PROGRAM_USERS_MEMBERSHIP_FAILURE, 'membership'],
      [actionTypes.CREATE_PROGRAM_MEMBERSHIP_FAILURE, 'membership'],
    ])('should handle %s action type', (actionType, subArea) => {
      const expectedResult = {
        ...initialState[subArea as keyof typeof subAreas],
        isLoading: initialState[subArea as keyof typeof subAreas].isLoading,
        error: 'error',
      };

      expect(
        reducer(undefined, {
          payload: { error: 'error' },
          type: actionType,
        })[subArea as keyof typeof subAreas],
      ).toEqual(expectedResult);
    });
  });
});
