import * as actionTypes from '../actionTypes';
import { mockBaseState } from '../../__fixtures__/state.fixtures';
import { toBlackoutError } from '@farfetch/blackout-client';
import reducer, { entitiesMapper, INITIAL_STATE } from '../reducer';
import type { StoreState } from '../../../types';

describe('reducer', () => {
  it.each([
    actionTypes.FETCH_USER_CONTACTS_REQUEST,
    actionTypes.FETCH_USER_CONTACT_REQUEST,
  ])('should handle %s correctly', actionType => {
    const previousState = {
      isLoading: false,
      error: null,
    };
    const newState = reducer(previousState, {
      type: actionType,
    });

    expect(newState).toEqual({ isLoading: true, error: INITIAL_STATE.error });
  });

  it.each([
    actionTypes.FETCH_USER_CONTACTS_FAILURE,
    actionTypes.FETCH_USER_CONTACT_FAILURE,
  ])('should handle %s correctly', actionType => {
    const previousState = {
      isLoading: true,
      error: null,
    };

    const dummyError = toBlackoutError(new Error('error'));

    const newState = reducer(previousState, {
      payload: { error: dummyError },
      type: actionType,
    });

    expect(newState).toEqual({
      isLoading: INITIAL_STATE.isLoading,
      error: dummyError,
    });
  });

  it.each([
    actionTypes.FETCH_USER_CONTACTS_SUCCESS,
    actionTypes.FETCH_USER_CONTACT_SUCCESS,
  ])('should handle %s correctly', actionType => {
    const previousState = {
      isLoading: true,
      error: null,
    };
    const newState = reducer(previousState, {
      type: actionType,
    });

    expect(newState).toEqual({ isLoading: false, error: INITIAL_STATE.error });
  });
});

describe('entitiesMapper()', () => {
  it('should handle FETCH_USER_CONTACTS_SUCCESS action type', () => {
    const idContact1 = 'contact1';
    const contactsEntity = {
      [idContact1]: {
        id: idContact1,
        value: 'TEST',
        countryDetails: {
          countryCode: 'PT',
          countryCallingCode: '351',
        },
        type: 'Phone',
        description: 'TEST',
      },
    };

    const expectedResult = {
      ...mockBaseState.entities,
      user: { ...mockBaseState.entities?.user, contacts: [idContact1] },
      contacts: { ...contactsEntity },
    };

    expect(
      entitiesMapper[actionTypes.FETCH_USER_CONTACTS_SUCCESS](
        mockBaseState.entities as NonNullable<StoreState['entities']>,
        {
          payload: {
            result: [idContact1],
            entities: {
              contacts: { ...contactsEntity },
            },
          },
          type: actionTypes.FETCH_USER_CONTACTS_SUCCESS,
        },
      ),
    ).toEqual(expectedResult);
  });
});
