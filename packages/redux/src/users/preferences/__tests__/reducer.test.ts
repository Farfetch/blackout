import * as actionTypes from '../actionTypes';
import { mockBaseState } from '../../__fixtures__/state.fixtures';
import { toBlackoutError } from '@farfetch/blackout-client';
import reducers, { entitiesMapper, INITIAL_STATE } from '../reducer';
import type { StoreState } from '../../../types';

const preferencesReducer = reducers.preferences;
const updatePreferencesReducer = reducers.updatePreferences;

describe('preferences reducer', () => {
  it.each([actionTypes.FETCH_USER_PREFERENCES_REQUEST])(
    'should handle %s correctly',
    actionType => {
      const previousState = {
        isLoading: false,
        error: null,
      };
      const newState = preferencesReducer(previousState, {
        type: actionType,
      });

      expect(newState).toEqual({
        isLoading: true,
        error: INITIAL_STATE.preferences.error,
      });
    },
  );

  it.each([actionTypes.FETCH_USER_PREFERENCES_FAILURE])(
    'should handle %s correctly',
    actionType => {
      const previousState = {
        isLoading: true,
        error: null,
      };

      const dummyError = toBlackoutError(new Error('error'));

      const newState = preferencesReducer(previousState, {
        payload: { error: dummyError },
        type: actionType,
      });

      expect(newState).toEqual({
        isLoading: INITIAL_STATE.preferences.isLoading,
        error: dummyError,
      });
    },
  );

  it.each([actionTypes.FETCH_USER_PREFERENCES_SUCCESS])(
    'should handle %s correctly',
    actionType => {
      const previousState = {
        isLoading: true,
        error: null,
      };
      const newState = preferencesReducer(previousState, {
        type: actionType,
      });

      expect(newState).toEqual({
        isLoading: false,
        error: INITIAL_STATE.preferences.error,
      });
    },
  );
});

describe('update preferences reducer', () => {
  it.each([actionTypes.UPDATE_USER_PREFERENCES_REQUEST])(
    'should handle %s correctly',
    actionType => {
      const previousState = {
        isLoading: false,
        error: null,
      };
      const newState = updatePreferencesReducer(previousState, {
        type: actionType,
      });

      expect(newState).toEqual({
        isLoading: true,
        error: INITIAL_STATE.updatePreferences.error,
      });
    },
  );

  it.each([actionTypes.UPDATE_USER_PREFERENCES_FAILURE])(
    'should handle %s correctly',
    actionType => {
      const previousState = {
        isLoading: true,
        error: null,
      };

      const dummyError = toBlackoutError(new Error('error'));

      const newState = updatePreferencesReducer(previousState, {
        payload: { error: dummyError },
        type: actionType,
      });

      expect(newState).toEqual({
        isLoading: INITIAL_STATE.updatePreferences.isLoading,
        error: dummyError,
      });
    },
  );

  it.each([actionTypes.UPDATE_USER_PREFERENCES_SUCCESS])(
    'should handle %s correctly',
    actionType => {
      const previousState = {
        isLoading: true,
        error: null,
      };
      const newState = updatePreferencesReducer(previousState, {
        type: actionType,
      });

      expect(newState).toEqual({
        isLoading: false,
        error: INITIAL_STATE.updatePreferences.error,
      });
    },
  );
});

describe('entitiesMapper()', () => {
  it('should handle FETCH_USER_PREFERENCES_SUCCESS action type when preferences are available on the server', () => {
    const codePreference = 'code1';
    const preferencesEntity = {
      [codePreference]: {
        code: codePreference,
        values: ['136968', '136831', '136908'],
        groupId: 'mobile',
        updatedDate: '2019-08-19T10:46:59.543Z',
      },
    };

    const expectedResult = {
      ...mockBaseState.entities,
      user: { ...mockBaseState.entities?.user, preferences: [codePreference] },
      preferences: { ...preferencesEntity },
    };

    expect(
      entitiesMapper[actionTypes.FETCH_USER_PREFERENCES_SUCCESS](
        mockBaseState.entities as NonNullable<StoreState['entities']>,
        {
          payload: {
            result: [codePreference],
            entities: {
              preferences: { ...preferencesEntity },
            },
          },
          type: actionTypes.FETCH_USER_PREFERENCES_SUCCESS,
        },
      ),
    ).toEqual(expectedResult);
  });
});

it('should handle UPDATE_USER_PREFERENCES_SUCCESS action type', () => {
  const codePreference = 'code1Updated';
  const preferencesEntity = {
    [codePreference]: {
      code: codePreference,
      values: ['136968', '136831', '136908'],
      groupId: 'mobile',
      updatedDate: '2019-08-19T10:46:59.543Z',
    },
  };

  const expectedResult = {
    ...mockBaseState.entities,
    user: { ...mockBaseState.entities?.user, preferences: [codePreference] },
    preferences: { ...preferencesEntity },
  };

  expect(
    entitiesMapper[actionTypes.UPDATE_USER_PREFERENCES_SUCCESS](
      mockBaseState.entities as NonNullable<StoreState['entities']>,
      {
        payload: {
          result: [codePreference],
          entities: {
            preferences: { ...preferencesEntity },
          },
        },
        type: actionTypes.UPDATE_USER_PREFERENCES_SUCCESS,
      },
    ),
  ).toEqual(expectedResult);
});
