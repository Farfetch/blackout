import { getInitialState } from '../../../tests';
import reducer, { actionTypes } from '..';

let initialState;

describe('loyalty reducer', () => {
  beforeEach(() => {
    initialState = getInitialState(reducer());
  });

  describe('initial state', () => {
    it.each([
      'programs',
      'membership',
      'replacements',
      'converts',
      'statements',
    ])('should return the initial state of %s', subArea => {
      const state = reducer()[subArea];

      expect(state).toEqual(initialState[subArea]);
    });
  });

  describe('action request', () => {
    it.each([
      [actionTypes.FETCH_PROGRAMS_REQUEST, 'programs'],
      [actionTypes.FETCH_PROGRAM_USERS_MEMBERSHIP_REQUEST, 'membership'],
      [actionTypes.CREATE_PROGRAM_MEMBERSHIP_REQUEST, 'membership'],
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
      [actionTypes.FETCH_PROGRAM_USERS_MEMBERSHIP_FAILURE, 'membership'],
      [actionTypes.CREATE_PROGRAM_MEMBERSHIP_FAILURE, 'membership'],
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
  });
});
