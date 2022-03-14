import { actionTypes } from '../..';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { putPreferences } from '@farfetch/blackout-client/users';
import { setPreferences } from '..';
import find from 'lodash/find';
import type { SetPreferencesData } from '@farfetch/blackout-client/users/types';

jest.mock('@farfetch/blackout-client/users', () => ({
  ...jest.requireActual('@farfetch/blackout-client/users'),
  putPreferences: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store = usersMockStore();

describe('updatePreferences action creator', () => {
  const userId = 232;
  const data = [
    {
      code: 'FFA',
      values: ['136968', '136831'],
    },
  ];
  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the update preferences procedure fails', async () => {
    const expectedError = new Error('update preferences error');

    (putPreferences as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(
        setPreferences(userId, {} as SetPreferencesData, expectedConfig),
      );
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(putPreferences).toHaveBeenCalledTimes(1);
      expect(putPreferences).toHaveBeenCalledWith(userId, {}, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.UPDATE_PREFERENCES_REQUEST },
          {
            type: actionTypes.UPDATE_PREFERENCES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the update preferences procedure is successful', async () => {
    const payload = {
      entities: {
        preferences: {
          FFA: {
            code: 'FFA',
            values: ['136968', '136831'],
          },
        },
      },
      result: ['FFA'],
    };
    (putPreferences as jest.Mock).mockResolvedValueOnce({});

    await store.dispatch(setPreferences(userId, data, expectedConfig));

    const actionResults = store.getActions();

    expect(putPreferences).toHaveBeenCalledTimes(1);
    expect(putPreferences).toHaveBeenCalledWith(userId, data, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_PREFERENCES_REQUEST },
      {
        type: actionTypes.UPDATE_PREFERENCES_SUCCESS,
        payload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_PREFERENCES_SUCCESS,
      }),
    ).toMatchSnapshot('update preferences success payload');
  });
});
