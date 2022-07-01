import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../../reducer';
import { mockStore } from '../../../../../tests';
import { putUserPreferences } from '@farfetch/blackout-client';
import { setUserPreferences } from '..';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  putUserPreferences: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store = usersMockStore();

describe('setUserPreferences action creator', () => {
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

    (putUserPreferences as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(setUserPreferences(userId, data, expectedConfig));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(putUserPreferences).toHaveBeenCalledTimes(1);
      expect(putUserPreferences).toHaveBeenCalledWith(
        userId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.UPDATE_USER_PREFERENCES_REQUEST },
          {
            type: actionTypes.UPDATE_USER_PREFERENCES_FAILURE,
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
    (putUserPreferences as jest.Mock).mockResolvedValueOnce({});

    await store.dispatch(setUserPreferences(userId, data, expectedConfig));

    const actionResults = store.getActions();

    expect(putUserPreferences).toHaveBeenCalledTimes(1);
    expect(putUserPreferences).toHaveBeenCalledWith(
      userId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_USER_PREFERENCES_REQUEST },
      {
        type: actionTypes.UPDATE_USER_PREFERENCES_SUCCESS,
        payload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_USER_PREFERENCES_SUCCESS,
      }),
    ).toMatchSnapshot('update preferences success payload');
  });
});
