import * as actionTypes from '../../actionTypes';
import * as authenticationActionTypes from '../../../users/authentication/actionTypes';
import { initialReduxState } from '../../../../tests';
import { INITIAL_STATE as subscriptionPackagesInitialState } from '../subscriptionPackages';
import { INITIAL_STATE as userSubscriptionInitialState } from '../userSubscriptions';
import merge from 'lodash/merge';
import reducer, { entitiesMapper } from '..';
import type { StoreState } from '../../../types';
import type { SubscriptionsState } from '../../types';

const INITIAL_STATE: SubscriptionsState = {
  user: { ...userSubscriptionInitialState },
  packages: { ...subscriptionPackagesInitialState },
};

describe('Subscriptions reducer', () => {
  it.each([
    actionTypes.RESET_SUBSCRIPTIONS,
    authenticationActionTypes.LOGOUT_SUCCESS,
  ])('Should reset store state when %s is dispatched', actionType => {
    const initialState: SubscriptionsState = {
      user: { ...INITIAL_STATE.user, isLoading: !INITIAL_STATE.user.isLoading },
      packages: {
        ...INITIAL_STATE.packages,
        isLoading: !INITIAL_STATE.packages.isLoading,
      },
    };

    const action = {
      type: actionType,
    };

    const result = reducer(initialState, action);

    expect(result).toStrictEqual(INITIAL_STATE);
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
