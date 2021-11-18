import {
  mockStaffMember,
  mockStaffMemberId,
} from 'tests/__fixtures__/staffMembers';
import reducer, { actionTypes } from '..';

let initialState;

describe('staff members reducer', () => {
  const meta = { id: mockStaffMemberId };

  beforeEach(() => {
    initialState = reducer();
  });

  describe('error() reducer', () => {
    const error = 'An error occurred';
    const expectedError = {
      [mockStaffMemberId]: error,
    };

    it('should return the initial state', () => {
      const state = reducer();

      expect(state.error).toEqual(initialState.error);
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
        error: {
          [mockStaffMemberId]: error,
        },
      };

      expect(reducer(state).error).toEqual(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer();

      expect(state.isLoading).toEqual(initialState.isLoading);
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
        isLoading: {
          [mockStaffMemberId]: false,
        },
      };

      expect(reducer(state).isLoading).toEqual(state.isLoading);
    });
  });

  describe('result() reducer', () => {
    const payload = { result: mockStaffMember };
    const expectedResult = {
      [mockStaffMemberId]: mockStaffMember,
    };
    it('should return the initial state', () => {
      const state = reducer();

      expect(state.result).toEqual(initialState.result);
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
        result: {
          [mockStaffMemberId]: mockStaffMember,
        },
      };

      expect(reducer(state).result).toEqual(state.result);
    });
  });
});
