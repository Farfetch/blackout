import * as fromReducer from '../reducer';
import { getInitialState } from '../../../tests';
import reducer, { actionTypes, entitiesMapper } from '..';

let initialState;

describe('returns reducer', () => {
  beforeEach(() => {
    initialState = getInitialState(reducer());
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it.each([
      actionTypes.CREATE_RETURN_REQUEST,
      actionTypes.GET_PICKUP_CAPABILITIES_REQUEST,
      actionTypes.GET_RETURN_REQUEST,
      actionTypes.UPDATE_RETURN_REQUEST,
      actionTypes.GET_REFERENCES_REQUEST,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(
          {
            error: 'previous error',
          },
          {
            type: actionType,
          },
        ).error,
      ).toBe(initialState.error);
    });

    it.each([
      actionTypes.CREATE_RETURN_FAILURE,
      actionTypes.GET_PICKUP_CAPABILITIES_FAILURE,
      actionTypes.GET_RETURN_FAILURE,
      actionTypes.GET_REFERENCES_FAILURE,
      actionTypes.UPDATE_RETURN_FAILURE,
    ])('should handle %s action type', actionType => {
      const error = 'foo';
      expect(
        reducer(undefined, {
          payload: { error },
          type: actionType,
        }).error,
      ).toBe(error);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { error: 'foo' };

      expect(reducer(state).error).toBe(state.error);
    });
  });

  describe('id() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().id;

      expect(state).toBe(initialState.id);
      expect(state).toBeNull();
    });

    it.each([
      actionTypes.CREATE_RETURN_SUCCESS,
      actionTypes.GET_RETURN_SUCCESS,
    ])('should handle %s action type', actionType => {
      const result = 'foo';
      expect(
        reducer(undefined, {
          payload: { result },
          type: actionType,
        }).id,
      ).toBe(result);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { id: 'foo' };

      expect(reducer(state).id).toBe(state.id);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    it.each([
      actionTypes.CREATE_RETURN_REQUEST,
      actionTypes.GET_PICKUP_CAPABILITIES_REQUEST,
      actionTypes.GET_RETURN_REQUEST,
      actionTypes.GET_REFERENCES_REQUEST,
      actionTypes.UPDATE_RETURN_REQUEST,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          type: actionType,
        }).isLoading,
      ).toBe(true);
    });

    it.each([
      actionTypes.CREATE_RETURN_SUCCESS,
      actionTypes.GET_PICKUP_CAPABILITIES_SUCCESS,
      actionTypes.GET_RETURN_SUCCESS,
      actionTypes.GET_REFERENCES_SUCCESS,
      actionTypes.UPDATE_RETURN_SUCCESS,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          payload: { result: '' },
          type: actionType,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it.each([
      actionTypes.CREATE_RETURN_FAILURE,
      actionTypes.GET_PICKUP_CAPABILITIES_FAILURE,
      actionTypes.GET_RETURN_FAILURE,
      actionTypes.GET_REFERNECES_FAILURE,
      actionTypes.UPDATE_RETURN_FAILURE,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionType,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { isLoading: 'foo' };

      expect(reducer(state).isLoading).toBe(state.isLoading);
    });
  });

  describe('entitiesMapper()', () => {
    const returnId = 123;
    const returnEntity = {
      id: returnId,
      orderId: '8VXRHN',
      merchantId: 10973,
      userId: 29511627,
    };
    const result = { anotherProp: 123 };
    const state = {
      returns: {
        1: returnEntity,
      },
    };

    const expectedResult = {
      returns: {
        1: {
          ...returnEntity,
          ...result,
        },
      },
    };

    it('should handle GET_PICKUP_CAPABILITIES_SUCCESS action type', () => {
      expect(
        entitiesMapper[actionTypes.GET_PICKUP_CAPABILITIES_SUCCESS](state, {
          meta: { id: 1 },
          payload: { entities: result },
          type: actionTypes.GET_PICKUP_CAPABILITIES_SUCCESS,
        }),
      ).toEqual(expectedResult);
    });

    it('should handle UPDATE_RETURN_SUCCESS action type', () => {
      expect(
        entitiesMapper[actionTypes.UPDATE_RETURN_SUCCESS](state, {
          meta: { id: 1 },
          payload: { entities: result },
          type: actionTypes.UPDATE_RETURN_SUCCESS,
        }),
      ).toEqual(expectedResult);
    });

    it('should handle RESET_RETURN action WITH reset entities flag ', () => {
      const expectedReturnsState = {};
      expect(
        entitiesMapper[actionTypes.RESET_RETURN](state, {
          meta: { resetEntities: true },
          type: actionTypes.RESET_RETURN,
        }),
      ).toEqual(expectedReturnsState);
    });

    it('should handle RESET_RETURN action WITHOUT reset entities flag ', () => {
      expect(
        entitiesMapper[actionTypes.RESET_RETURN](state, {
          meta: { resetEntities: false },
          type: actionTypes.RESET_RETURN,
        }),
      ).toEqual(state);
    });
  });

  describe('getId() selector', () => {
    it('should return the `id` property from a given state', () => {
      const id = 123;

      expect(fromReducer.getId({ id })).toBe(id);
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = 'foo';

      expect(fromReducer.getError({ error })).toBe(error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = 'foo';

      expect(fromReducer.getIsLoading({ isLoading })).toBe(isLoading);
    });
  });
});
