import * as fromReducer from '../reducer';
import { LOGOUT_SUCCESS } from '@farfetch/blackout-redux/authentication/actionTypes';
import { returnId } from 'tests/__fixtures__/returns';
import reducer, { actionTypes, entitiesMapper } from '..';

let initialState;
const randomAction = { type: 'this_is_a_random_action' };

describe('returns reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('error() reducer', () => {
    const expectedResult = 'foo';

    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it.each([
      actionTypes.CREATE_RETURN_REQUEST,
      actionTypes.FETCH_PICKUP_CAPABILITIES_REQUEST,
      actionTypes.FETCH_RETURN_REQUEST,
      actionTypes.UPDATE_RETURN_REQUEST,
      actionTypes.FETCH_REFERENCES_REQUEST,
      LOGOUT_SUCCESS,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          type: actionType,
        }).error,
      ).toBe(initialState.error);
    });

    it('should handle CREATE_RETURN_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.CREATE_RETURN_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle FETCH_PICKUP_CAPABILITIES_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.FETCH_PICKUP_CAPABILITIES_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle FETCH_RETURN_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.FETCH_RETURN_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle FETCH_REFERENCES_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.FETCH_REFERENCES_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle UPDATE_RETURN_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.UPDATE_RETURN_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, error: 'foo' };

      expect(reducer(state, randomAction).error).toBe(state.error);
    });
  });

  describe('id() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).id;

      expect(state).toBe(initialState.id);
      expect(state).toBeNull();
    });

    it('should handle CREATE_RETURN_SUCCESS action type', () => {
      const expectedResult = { result: returnId };

      expect(
        reducer(undefined, {
          payload: expectedResult,
          type: actionTypes.CREATE_RETURN_SUCCESS,
        }).id,
      ).toBe(returnId);
    });

    it('should handle FETCH_RETURN_SUCCESS action type', () => {
      const expectedResult = { result: returnId };

      expect(
        reducer(undefined, {
          payload: expectedResult,
          type: actionTypes.FETCH_RETURN_SUCCESS,
        }).id,
      ).toBe(returnId);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, id: 'foo' };

      expect(reducer(state, randomAction).id).toBe(state.id);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    it.each([
      actionTypes.CREATE_RETURN_REQUEST,
      actionTypes.FETCH_PICKUP_CAPABILITIES_REQUEST,
      actionTypes.FETCH_RETURN_REQUEST,
      actionTypes.FETCH_REFERENCES_REQUEST,
      actionTypes.UPDATE_RETURN_REQUEST,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          type: actionType,
        }).isLoading,
      ).toBe(true);
    });

    it.each([
      actionTypes.FETCH_PICKUP_CAPABILITIES_SUCCESS,
      actionTypes.FETCH_REFERENCES_SUCCESS,
      actionTypes.UPDATE_RETURN_SUCCESS,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          type: actionType,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_RETURN_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_RETURN_SUCCESS,
          payload: { result: returnId },
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle CREATE_RETURN_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.CREATE_RETURN_SUCCESS,
          payload: { result: returnId },
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle CREATE_RETURN_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.CREATE_RETURN_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_PICKUP_CAPABILITIES_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.FETCH_PICKUP_CAPABILITIES_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_RETURN_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.FETCH_RETURN_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_REFERENCES_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.FETCH_REFERENCES_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle UPDATE_RETURN_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.UPDATE_RETURN_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: 'foo' };

      expect(reducer(state, randomAction).isLoading).toBe(state.isLoading);
    });
  });

  describe('entitiesMapper()', () => {
    const state = {
      error: null,
      id: null,
      isLoading: false,
      returns: {
        error: null,
        isLoading: false,
      },
      returnItems: {
        error: null,
        isLoading: false,
      },
      references: {
        error: null,
        isLoading: false,
      },
      pickupCapabilities: {
        error: null,
        isLoading: false,
      },
    };

    const expectedResult = {
      error: null,
      id: null,
      isLoading: false,
      references: {
        error: null,
        isLoading: false,
      },
      pickupCapabilities: {
        error: null,
        isLoading: false,
      },
    };

    it('should handle RESET_RETURN action WITH reset entities flag ', () => {
      expect(
        entitiesMapper[actionTypes.RESET_RETURN](state, {
          meta: { resetEntities: true },
          type: actionTypes.RESET_RETURN,
        }),
      ).toEqual(expectedResult);
    });

    it('should handle RESET_RETURN action WITHOUT reset entities flag ', () => {
      expect(
        entitiesMapper[actionTypes.RESET_RETURN](state, {
          meta: { resetEntities: false },
          type: actionTypes.RESET_RETURN,
        }),
      ).toEqual(state);
    });

    it('should handle LOGOUT_SUCCESS', () => {
      expect(
        entitiesMapper[LOGOUT_SUCCESS](state, {
          meta: { resetEntities: false },
          type: LOGOUT_SUCCESS,
        }),
      ).toEqual(state);
    });
  });

  describe('getId() selector', () => {
    it('should return the `id` property from a given state', () => {
      const id = '123';

      expect(fromReducer.getId({ ...initialState, id })).toBe(id);
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = 'foo';

      expect(fromReducer.getError({ ...initialState, error })).toBe(error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = 'foo';

      expect(fromReducer.getIsLoading({ ...initialState, isLoading })).toBe(
        isLoading,
      );
    });
  });
});
