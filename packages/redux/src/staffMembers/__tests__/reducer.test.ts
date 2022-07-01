import * as actionTypes from '../actionTypes';
import {
  mockStaffMember,
  mockStaffMemberId,
} from 'tests/__fixtures__/staffMembers';
import { toBlackoutError } from '@farfetch/blackout-client';
import reducer, { INITIAL_STATE } from '../reducer';
import type { State } from '../types';

const mockAction = { type: 'foo' };
const meta = { id: mockStaffMemberId };
let initialState: State;

describe('staff members reducer', () => {
  beforeEach(() => {
    initialState = reducer(INITIAL_STATE, mockAction);
  });

  describe('error() reducer', () => {
    const error = 'An error occurred';
    const expectedError = {
      [mockStaffMemberId]: error,
    };

    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).error;

      expect(state).toEqual(initialState.error);
    });

    it(`should handle ${actionTypes.FETCH_STAFF_MEMBER_REQUEST} action type`, () => {
      const expectedError = {
        [mockStaffMemberId]: undefined,
      };
      const state = reducer(undefined, {
        type: actionTypes.FETCH_STAFF_MEMBER_REQUEST,
        payload: {
          error,
        },
        meta,
      });

      expect(state.error).toEqual(expectedError);
    });

    it(`should handle ${actionTypes.FETCH_STAFF_MEMBER_FAILURE} action type`, () => {
      const state = reducer(undefined, {
        type: actionTypes.FETCH_STAFF_MEMBER_FAILURE,
        payload: {
          error,
        },
        meta,
      });

      expect(state.error).toEqual(expectedError);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        error: { [mockStaffMemberId]: toBlackoutError(new Error('error')) },
        isLoading: {},
        result: {},
      };

      expect(reducer(state, mockAction).error).toEqual(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).isLoading;

      expect(state).toEqual(initialState.isLoading);
    });

    it(`should handle ${actionTypes.FETCH_STAFF_MEMBER_REQUEST} action type`, () => {
      const expectedIsLoading = {
        [mockStaffMemberId]: true,
      };
      const state = reducer(undefined, {
        type: actionTypes.FETCH_STAFF_MEMBER_REQUEST,
        meta,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it(`should handle ${actionTypes.FETCH_STAFF_MEMBER_SUCCESS} action type`, () => {
      const expectedIsLoading = {
        [mockStaffMemberId]: false,
      };
      const state = reducer(undefined, {
        type: actionTypes.FETCH_STAFF_MEMBER_SUCCESS,
        payload: { result: mockStaffMember },
        meta,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it(`should handle ${actionTypes.FETCH_STAFF_MEMBER_FAILURE} action type`, () => {
      const expectedIsLoading = {
        [mockStaffMemberId]: undefined,
      };
      const state = reducer(undefined, {
        type: actionTypes.FETCH_STAFF_MEMBER_FAILURE,
        payload: {
          error: 'this is an error',
        },
        meta,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        error: {},
        isLoading: { [mockStaffMemberId]: false },
        result: {},
      };

      expect(reducer(state, mockAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('result() reducer', () => {
    const payload = { result: mockStaffMember };
    const expectedResult = {
      [mockStaffMemberId]: mockStaffMember,
    };
    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).result;

      expect(state).toEqual(initialState.result);
    });

    it(`should handle ${actionTypes.FETCH_STAFF_MEMBER_SUCCESS} action type`, () => {
      const state = reducer(undefined, {
        type: actionTypes.FETCH_STAFF_MEMBER_SUCCESS,
        payload,
        meta,
      });

      expect(state.result).toEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        error: {},
        isLoading: {},
        result: { [mockStaffMemberId]: mockStaffMember },
      };

      expect(reducer(state, mockAction).result).toEqual(state.result);
    });
  });
});
