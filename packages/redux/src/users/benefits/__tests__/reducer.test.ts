import * as actionTypes from '../actionTypes';
import { mockBaseState } from '../../__fixtures__/state.fixtures';
import { toBlackoutError } from '@farfetch/blackout-client';
import reducer, { entitiesMapper, INITIAL_STATE } from '../reducer';
import type { StoreState } from '../../../types';

describe('reducer', () => {
  it('should handle FETCH_USER_BENEFITS_REQUEST correctly', () => {
    const previousState = {
      isLoading: false,
      error: null,
    };
    const newState = reducer(previousState, {
      type: actionTypes.FETCH_USER_BENEFITS_REQUEST,
    });

    expect(newState).toEqual({ isLoading: true, error: INITIAL_STATE.error });
  });

  it('should handle FETCH_USER_BENEFITS_FAILURE correctly', () => {
    const previousState = {
      isLoading: true,
      error: null,
    };

    const dummyError = toBlackoutError(new Error('error'));

    const newState = reducer(previousState, {
      payload: { error: dummyError },
      type: actionTypes.FETCH_USER_BENEFITS_FAILURE,
    });

    expect(newState).toEqual({
      isLoading: INITIAL_STATE.isLoading,
      error: dummyError,
    });
  });

  it('should handle FETCH_USER_BENEFITS_SUCCESS correctly', () => {
    const previousState = {
      isLoading: true,
      error: null,
    };
    const newState = reducer(previousState, {
      type: actionTypes.FETCH_USER_BENEFITS_SUCCESS,
    });

    expect(newState).toEqual({ isLoading: false, error: INITIAL_STATE.error });
  });
});

describe('entitiesMapper()', () => {
  it('should handle FETCH_USER_BENEFITS_SUCCESS action type', () => {
    const idBenefit1 = 1111;
    const benefitsEntity = {
      [idBenefit1]: {
        id: idBenefit1,
        code: 'SummerParty2017',
        isActive: true,
        metadata: {
          'dress-code': 'green',
        },
        benefitType: 'price',
      },
    };

    // The expected result is the user entity containing the added the benefit
    // and the benefits entity being created.
    const expectedResult = {
      ...mockBaseState.entities,
      user: { ...mockBaseState.entities?.user, benefits: [idBenefit1] },
      benefits: { ...benefitsEntity },
    };

    expect(
      entitiesMapper[actionTypes.FETCH_USER_BENEFITS_SUCCESS](
        mockBaseState.entities as NonNullable<StoreState['entities']>,
        {
          payload: {
            result: [idBenefit1],
            entities: {
              benefits: { ...benefitsEntity },
            },
          },
          type: actionTypes.FETCH_USER_BENEFITS_SUCCESS,
        },
      ),
    ).toEqual(expectedResult);
  });
});
