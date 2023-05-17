import * as actionTypes from '../actionTypes.js';
import {
  toBlackoutError,
  UserPersonalIdVerifyLevel,
} from '@farfetch/blackout-client';
import reducer, * as fromReducer from '../reducer.js';
import type { UserPersonalIdsState } from '../../types/index.js';

let initialState: UserPersonalIdsState;

describe('personalIds reducers', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const newState = reducer(undefined, { type: 'INIT' }).result;

      expect(newState).toBe(initialState.result);
      expect(newState).toBeNull();
    });

    it('should handle FETCH_USER_PERSONAL_IDS_SUCCESS action type', () => {
      const newResult = [
        {
          backImageId: '',
          expiryDate: '',
          frontImageId: '',
          id: '111',
          isDefault: false,
          maskedIdNumber: '',
          maskedName: '',
          verifyLevel: UserPersonalIdVerifyLevel.Valid,
        },
        {
          backImageId: '',
          expiryDate: '',
          frontImageId: '',
          id: '222',
          isDefault: false,
          maskedIdNumber: '',
          maskedName: '',
          verifyLevel: UserPersonalIdVerifyLevel.Valid,
        },
      ];
      const state = {
        ...initialState,
        result: [
          {
            backImageId: '',
            expiryDate: '',
            frontImageId: '',
            id: '',
            isDefault: false,
            maskedIdNumber: '',
            maskedName: '',
            verifyLevel: UserPersonalIdVerifyLevel.Valid,
          },
        ],
      };

      const newState = reducer(state, {
        payload: newResult,
        type: actionTypes.FETCH_USER_PERSONAL_IDS_SUCCESS,
      });

      expect(newState.result).toEqual(newResult);
    });

    it('should handle FETCH_USER_PERSONAL_ID_SUCCESS action type', () => {
      const newResult = {
        backImageId: '',
        expiryDate: '',
        frontImageId: '',
        id: '111',
        isDefault: false,
        maskedIdNumber: '',
        maskedName: '',
        verifyLevel: UserPersonalIdVerifyLevel.Valid,
      };
      const state = {
        ...initialState,
        result: [
          {
            backImageId: '',
            expiryDate: '',
            frontImageId: '',
            id: '333',
            isDefault: false,
            maskedIdNumber: '',
            maskedName: '',
            verifyLevel: UserPersonalIdVerifyLevel.Valid,
          },
        ],
      };
      const expectedResult = [
        {
          backImageId: '',
          expiryDate: '',
          frontImageId: '',
          id: '333',
          isDefault: false,
          maskedIdNumber: '',
          maskedName: '',
          verifyLevel: UserPersonalIdVerifyLevel.Valid,
        },
        {
          backImageId: '',
          expiryDate: '',
          frontImageId: '',
          id: '111',
          isDefault: false,
          maskedIdNumber: '',
          maskedName: '',
          verifyLevel: UserPersonalIdVerifyLevel.Valid,
        },
      ];

      const newState = reducer(state, {
        payload: newResult,
        type: actionTypes.FETCH_USER_PERSONAL_ID_SUCCESS,
      });

      expect(newState.result).toEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        error: null,
        isLoading: false,
        result: [
          {
            backImageId: '',
            expiryDate: '',
            frontImageId: '',
            id: '111',
            isDefault: false,
            maskedIdNumber: '',
            maskedName: '',
            verifyLevel: UserPersonalIdVerifyLevel.Valid,
          },
        ],
        defaultPersonalId: {
          error: null,
          isLoading: false,
          result: null,
        },
      };

      const randomActionWithResult = {
        type: 'random',
        result: [
          {
            backImageId: '',
            expiryDate: '',
            frontImageId: '',
            id: '222',
            isDefault: false,
            maskedIdNumber: '',
            maskedName: '',
            verifyLevel: UserPersonalIdVerifyLevel.Valid,
          },
        ],
      };

      expect(reducer(state, randomActionWithResult).result).toBe(state.result);
    });
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, { type: 'INIT' }).error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    // Error value on FAILURE
    it.each([
      actionTypes.FETCH_USER_PERSONAL_IDS_FAILURE,
      actionTypes.CREATE_USER_PERSONAL_ID_FAILURE,
      actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_FAILURE,
      actionTypes.SET_USER_DEFAULT_PERSONAL_ID_FAILURE,
      actionTypes.CREATE_USER_PERSONAL_ID_IMAGE_FAILURE,
      actionTypes.FETCH_USER_PERSONAL_ID_FAILURE,
      actionTypes.UPDATE_USER_PERSONAL_ID_FAILURE,
      actionTypes.REMOVE_USER_PERSONAL_ID_FAILURE,
    ])('should handle %s action type', actionType => {
      const error = 'foo';
      const reducerResult = reducer(undefined, {
        payload: { error },
        type: actionType,
      });

      expect(reducerResult.error).toBe(error);
    });

    // Error value on REQUEST
    it.each([
      actionTypes.FETCH_USER_PERSONAL_IDS_REQUEST,
      actionTypes.CREATE_USER_PERSONAL_ID_REQUEST,
      actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_REQUEST,
      actionTypes.SET_USER_DEFAULT_PERSONAL_ID_REQUEST,
      actionTypes.CREATE_USER_PERSONAL_ID_IMAGE_REQUEST,
      actionTypes.FETCH_USER_PERSONAL_ID_REQUEST,
      actionTypes.UPDATE_USER_PERSONAL_ID_REQUEST,
      actionTypes.REMOVE_USER_PERSONAL_ID_REQUEST,
    ])('should handle %s action type', actionType => {
      const previousState = {
        ...initialState,
        error: toBlackoutError(new Error('foo')),
      };
      const reducerResult = reducer(previousState, {
        type: actionType,
      });

      expect(reducerResult.error).toBe(initialState.error);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        error: { code: '123', name: 'error', message: 'error' },
      };

      const randomActionWithError = {
        type: 'random',
        payload: { error: new Error('dummy error') },
      };

      expect(reducer(state, randomActionWithError).error).toBe(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const newState = reducer(undefined, { type: 'INIT' }).isLoading;

      expect(newState).toBe(initialState.isLoading);
      expect(newState).toBe(false);
    });

    // Loading status on REQUEST
    it.each([
      actionTypes.FETCH_USER_PERSONAL_IDS_REQUEST,
      actionTypes.CREATE_USER_PERSONAL_ID_REQUEST,
      actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_REQUEST,
      actionTypes.SET_USER_DEFAULT_PERSONAL_ID_REQUEST,
      actionTypes.CREATE_USER_PERSONAL_ID_IMAGE_REQUEST,
      actionTypes.FETCH_USER_PERSONAL_ID_REQUEST,
      actionTypes.UPDATE_USER_PERSONAL_ID_REQUEST,
      actionTypes.REMOVE_USER_PERSONAL_ID_REQUEST,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          type: actionType,
        }).isLoading,
      ).toBe(true);
    });

    // Loading status on SUCCESS
    it.each([
      actionTypes.FETCH_USER_PERSONAL_IDS_SUCCESS,
      actionTypes.CREATE_USER_PERSONAL_ID_SUCCESS,
      actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_SUCCESS,
      actionTypes.SET_USER_DEFAULT_PERSONAL_ID_SUCCESS,
      actionTypes.CREATE_USER_PERSONAL_ID_IMAGE_SUCCESS,
      actionTypes.FETCH_USER_PERSONAL_ID_SUCCESS,
      actionTypes.UPDATE_USER_PERSONAL_ID_SUCCESS,
      actionTypes.REMOVE_USER_PERSONAL_ID_SUCCESS,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          payload: { result: '' },
          type: actionType,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    // Loading status on FAILURE
    it.each([
      actionTypes.FETCH_USER_PERSONAL_IDS_FAILURE,
      actionTypes.CREATE_USER_PERSONAL_ID_FAILURE,
      actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_FAILURE,
      actionTypes.SET_USER_DEFAULT_PERSONAL_ID_FAILURE,
      actionTypes.CREATE_USER_PERSONAL_ID_IMAGE_FAILURE,
      actionTypes.FETCH_USER_PERSONAL_ID_FAILURE,
      actionTypes.UPDATE_USER_PERSONAL_ID_FAILURE,
      actionTypes.REMOVE_USER_PERSONAL_ID_FAILURE,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionType,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        isLoading: true,
      };

      const randomAction = {
        type: 'random_action',
      };

      expect(reducer(state, randomAction).isLoading).toBe(state.isLoading);
    });
  });

  describe('defaultPersonalId() reducer', () => {
    it('should return the initial state', () => {
      const state = fromReducer.INITIAL_STATE.defaultPersonalId;

      expect(state).toEqual(initialState.defaultPersonalId);
      expect(state).toEqual({ error: null, isLoading: false, result: null });
    });

    // Error and loading status on REQUEST for default personal id
    it.each([actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_REQUEST])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(undefined, {
            type: actionType,
          }).defaultPersonalId,
        ).toEqual({
          error: null,
          isLoading: true,
        });
      },
    );

    // Error and loading status on FAILURE for default personal id
    it.each([actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_FAILURE])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(undefined, {
            type: actionType,
            payload: { error: '' },
          }).defaultPersonalId,
        ).toEqual({
          error: '',
          isLoading: false,
        });
      },
    );

    // Error and loading status on SUCCESS for default personal id
    it.each([actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_SUCCESS])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(undefined, {
            type: actionType,
          }).defaultPersonalId,
        ).toEqual({ error: null, isLoading: false });
      },
    );

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        defaultPersonalId: { isLoading: false, error: null, result: null },
      };

      const randomAction = {
        type: 'random_action',
      };

      expect(reducer(state, randomAction).defaultPersonalId).toEqual(
        state.defaultPersonalId,
      );
    });
  });
});
