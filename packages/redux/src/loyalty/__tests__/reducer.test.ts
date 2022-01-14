import * as fromReducer from '../reducer';
import { LOGOUT_SUCCESS } from '@farfetch/blackout-redux/authentication/actionTypes';
import reducer, { actionTypes } from '..';

let initialState;

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
      const state = fromReducer.INITIAL_STATE[subArea];

      expect(state).toEqual(initialState[subArea]);
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
        error: initialState[subArea].error,
        isLoading: true,
      };

      expect(
        reducer(undefined, {
          type: actionType,
        })[subArea],
      ).toEqual(expectedResult);
    });

    it.each([
      [actionTypes.FETCH_PROGRAM_USERS_MEMBERSHIP_REQUEST, 'membership'],
      [actionTypes.CREATE_PROGRAM_MEMBERSHIP_REQUEST, 'membership'],
    ])('should handle %s action type', (actionType, subArea) => {
      const expectedResult = {
        ...initialState[subArea],
        error: initialState[subArea].error,
        isLoading: true,
      };

      expect(
        reducer(undefined, {
          type: actionType,
        })[subArea],
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
        ...initialState[subArea],
        result: 'foo',
      };

      expect(
        reducer(undefined, {
          payload: { result: 'foo' },
          type: actionType,
        })[subArea],
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
        isLoading: initialState[subArea].isLoading,
        error: 'error',
      };

      expect(
        reducer(undefined, {
          payload: { error: 'error' },
          type: actionType,
        })[subArea],
      ).toEqual(expectedResult);
    });

    it.each([
      [actionTypes.FETCH_PROGRAM_USERS_MEMBERSHIP_FAILURE, 'membership'],
      [actionTypes.CREATE_PROGRAM_MEMBERSHIP_FAILURE, 'membership'],
    ])('should handle %s action type', (actionType, subArea) => {
      const expectedResult = {
        ...initialState[subArea],
        isLoading: initialState[subArea].isLoading,
        error: 'error',
      };

      expect(
        reducer(undefined, {
          payload: { error: 'error' },
          type: actionType,
        })[subArea],
      ).toEqual(expectedResult);
    });
  });
});
