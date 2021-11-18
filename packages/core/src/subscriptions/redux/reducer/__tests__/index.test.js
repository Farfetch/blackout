import * as actionTypes from '../../actionTypes';
import * as authenticationActionTypes from '../../../../authentication/redux/actionTypes';
import reducer, { entitiesMapper, INITIAL_STATE } from '..';

describe('Subscriptions reducer', () => {
  it.each([
    actionTypes.RESET_SUBSCRIPTIONS,
    authenticationActionTypes.LOGOUT_SUCCESS,
  ])('Should reset store state when %s is dispatched', actionType => {
    const initialState = {
      user: {
        error: null,
        isLoading: false,
        result: [],
      },
      packages: {
        error: 'Error getting packages...',
        isLoading: false,
        result: null,
      },
    };

    const action = {
      type: actionType,
    };

    const result = reducer(initialState, action);

    expect(result).toBe(INITIAL_STATE);
  });
});

describe('entitiesMapper', () => {
  it.each([
    actionTypes.RESET_SUBSCRIPTIONS,
    authenticationActionTypes.LOGOUT_SUCCESS,
  ])('should map the %s action to a new state', actionType => {
    const state = {
      products: {
        1: { id: 1 },
      },
      subscriptionPackages: {
        Newsletter: {},
      },
      dummy: {},
    };

    const expectedResult = {
      products: {
        1: { id: 1 },
      },
      dummy: {},
    };

    expect(entitiesMapper[actionType](state)).toEqual(expectedResult);
  });
});
