import * as actionTypes from '../actionTypes';
import { mockBaseState } from '../../__fixtures__/state.fixtures';
import { toBlackoutError } from '@farfetch/blackout-client';
import reducers, { entitiesMapper, INITIAL_STATE } from '../reducer';
import type { StoreState } from '../../../types';

const creditsReducer = reducers.credits;
const creditMovementsReducer = reducers.creditMovements;

describe('credits reducer', () => {
  it.each([actionTypes.FETCH_USER_CREDITS_REQUEST])(
    'should handle %s correctly',
    actionType => {
      const previousState = {
        isLoading: false,
        error: null,
      };
      const newState = creditsReducer(previousState, {
        type: actionType,
      });

      expect(newState).toEqual({
        isLoading: true,
        error: INITIAL_STATE.credits.error,
      });
    },
  );

  it.each([actionTypes.FETCH_USER_CREDITS_FAILURE])(
    'should handle %s correctly',
    actionType => {
      const previousState = {
        isLoading: true,
        error: null,
      };

      const dummyError = toBlackoutError(new Error('error'));

      const newState = creditsReducer(previousState, {
        payload: { error: dummyError },
        type: actionType,
      });

      expect(newState).toEqual({
        isLoading: INITIAL_STATE.credits.isLoading,
        error: dummyError,
      });
    },
  );

  it.each([actionTypes.FETCH_USER_CREDITS_SUCCESS])(
    'should handle %s correctly',
    actionType => {
      const previousState = {
        isLoading: true,
        error: null,
      };
      const newState = creditsReducer(previousState, {
        type: actionType,
      });

      expect(newState).toEqual({
        isLoading: false,
        error: INITIAL_STATE.credits.error,
      });
    },
  );
});

describe('credit movements reducer', () => {
  it.each([actionTypes.FETCH_USER_CREDIT_MOVEMENTS_REQUEST])(
    'should handle %s correctly',
    actionType => {
      const previousState = {
        isLoading: false,
        error: null,
      };
      const newState = creditMovementsReducer(previousState, {
        type: actionType,
      });

      expect(newState).toEqual({
        isLoading: true,
        error: INITIAL_STATE.creditMovements.error,
      });
    },
  );

  it.each([actionTypes.FETCH_USER_CREDIT_MOVEMENTS_FAILURE])(
    'should handle %s correctly',
    actionType => {
      const previousState = {
        isLoading: true,
        error: null,
      };

      const dummyError = toBlackoutError(new Error('error'));

      const newState = creditMovementsReducer(previousState, {
        payload: { error: dummyError },
        type: actionType,
      });

      expect(newState).toEqual({
        isLoading: INITIAL_STATE.creditMovements.isLoading,
        error: dummyError,
      });
    },
  );

  it.each([actionTypes.FETCH_USER_CREDIT_MOVEMENTS_SUCCESS])(
    'should handle %s correctly',
    actionType => {
      const previousState = {
        isLoading: true,
        error: null,
      };
      const newState = creditMovementsReducer(previousState, {
        type: actionType,
      });

      expect(newState).toEqual({
        isLoading: false,
        error: INITIAL_STATE.creditMovements.error,
      });
    },
  );
});

describe('entitiesMapper()', () => {
  it('should handle FETCH_USER_CREDITS_SUCCESS action type', () => {
    const credits = [
      {
        currency: 'GB',
        value: 50,
        formattedValue: '£50',
      },
    ];

    const expectedResult = {
      ...mockBaseState.entities,
      user: { ...mockBaseState.entities?.user, credits },
    };

    expect(
      entitiesMapper[actionTypes.FETCH_USER_CREDITS_SUCCESS](
        mockBaseState.entities as NonNullable<StoreState['entities']>,
        {
          payload: {
            credits,
          },
          type: actionTypes.FETCH_USER_CREDITS_SUCCESS,
        },
      ),
    ).toEqual(expectedResult);
  });

  it('should handle FETCH_USER_CREDIT_MOVEMENTS_SUCCESS action type', () => {
    const creditMovements = {
      entries: [
        {
          type: 1,
          value: 0.57,
          formattedValue: '$0.57',
          currency: 'USD',
          description: 'Other Reason (FF fault)',
          createdOn: '/Date(1581071861195)/',
        },
      ],
      number: 1,
      totalItems: 1,
      totalPages: 1,
    };

    const expectedResult = {
      ...mockBaseState.entities,
      user: { ...mockBaseState.entities?.user, creditMovements },
    };

    expect(
      entitiesMapper[actionTypes.FETCH_USER_CREDIT_MOVEMENTS_SUCCESS](
        mockBaseState.entities as NonNullable<StoreState['entities']>,
        {
          payload: {
            creditMovements,
          },
          type: actionTypes.FETCH_USER_CREDIT_MOVEMENTS_SUCCESS,
        },
      ),
    ).toEqual(expectedResult);
  });
});
