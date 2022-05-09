import * as actionTypes from '../../actionTypes';
import * as authenticationActionTypes from '../../../authentication/actionTypes';
import { initialReduxState } from '../../../../tests';
import merge from 'lodash/merge';
import reducer, { entitiesMapper, INITIAL_STATE } from '..';
import type { StoreState } from '@farfetch/blackout-redux/types';
import type { SubscriptionState } from '../../types';

describe('Subscriptions reducer', () => {
  it.each([
    actionTypes.RESET_SUBSCRIPTIONS,
    authenticationActionTypes.LOGOUT_SUCCESS,
  ])('Should reset store state when %s is dispatched', actionType => {
    const initialState = merge(
      {} as SubscriptionState,
      initialReduxState.subscriptions,
    );

    const action = {
      type: actionType,
    };

    const result = reducer(initialState, action);

    expect(result).toBe(INITIAL_STATE);
  });
});

describe('entitiesMapper', () => {
  it.each(Object.keys(entitiesMapper))(
    'should map the %s action to a new state',
    actionType => {
      const entitiesState = merge(
        {} as StoreState['entities'],
        initialReduxState.entities,
      );

      const expectedResult = {
        ...initialReduxState.entities,
        subscriptionPackages: undefined,
      };

      delete expectedResult.subscriptionPackages;

      // @ts-expect-error
      const mapper = entitiesMapper[actionType];
      expect(mapper(entitiesState)).toEqual(expectedResult);
    },
  );
});
