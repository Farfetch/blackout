import * as actionTypes from '../../actionTypes';
import * as authenticationActionTypes from '../../../authentication/actionTypes';
import { initialReduxState } from 'redux/tests';
import merge from 'lodash/merge';
import reducer, { entitiesMapper, INITIAL_STATE } from '..';

describe('Subscriptions reducer', () => {
  it.each([
    actionTypes.RESET_SUBSCRIPTIONS,
    authenticationActionTypes.LOGOUT_SUCCESS,
  ])('Should reset store state when %s is dispatched', actionType => {
    const initialState = merge({}, initialReduxState.subscriptions);

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
    const entitiesState = merge({}, initialReduxState.entities);

    const expectedResult = {
      ...initialReduxState.entities,
      subscriptionPackages: undefined,
    };

    delete expectedResult.subscriptionPackages;

    expect(entitiesMapper[actionType](entitiesState)).toEqual(expectedResult);
  });
});
