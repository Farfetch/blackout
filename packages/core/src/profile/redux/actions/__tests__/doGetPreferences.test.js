import {
  expectedPreferencesNormalizedPayload,
  mockGetPreferencesResponse,
} from '../../__fixtures__/preferences.fixtures';
import { mockStore } from '../../../../../tests';
import doGetPreferences from '../doGetPreferences';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const profileMockStore = (state = {}) =>
  mockStore({ profile: reducer() }, state);

const expectedConfig = undefined;
let store;
const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');

describe('doGetPreferences action creator', () => {
  const userId = '232';
  const mockCode = 'test';
  const getPreferences = jest.fn();
  const action = doGetPreferences(getPreferences);

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
  });

  it('should create the correct actions for when the get preferences procedure fails', async () => {
    const expectedError = new Error('get preferences error');

    getPreferences.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId, mockCode, expectedConfig));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getPreferences).toHaveBeenCalledTimes(1);
      expect(getPreferences).toHaveBeenCalledWith(
        userId,
        mockCode,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.GET_PREFERENCES_REQUEST,
          },
          {
            type: actionTypes.GET_PREFERENCES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get preferences procedure is successful', async () => {
    getPreferences.mockResolvedValueOnce(mockGetPreferencesResponse);

    await store.dispatch(action(userId, mockCode, expectedConfig));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getPreferences).toHaveBeenCalledTimes(1);
    expect(getPreferences).toHaveBeenCalledWith(
      userId,
      mockCode,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_PREFERENCES_REQUEST },
      {
        payload: expectedPreferencesNormalizedPayload,
        type: actionTypes.GET_PREFERENCES_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_PREFERENCES_SUCCESS,
      }),
    ).toMatchSnapshot('get preferences success payload');
  });
});
