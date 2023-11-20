import * as actionTypes from '../../actionTypes.js';
import { fetchAccountSettings } from '../index.js';
import { getAccountSettings } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/accountSettings.js';
import { mockAccountSettings } from 'tests/__fixtures__/settings/index.mjs';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getAccountSettings: jest.fn(),
}));

const buildSettingsMockStore = (state = {}) =>
  mockStore({ settings: INITIAL_STATE }, state);
const expectedConfig = undefined;
const expectedQuery = undefined;
const hash = 'noqueries';
let store: ReturnType<typeof buildSettingsMockStore>;

describe('fetchAccountSettings() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = buildSettingsMockStore();
  });

  it('should create the correct actions in case the fetch settings procedure fails', async () => {
    const expectedError = new Error('fetch settings error');

    (getAccountSettings as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchAccountSettings()(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getAccountSettings).toHaveBeenCalledTimes(1);
    expect(getAccountSettings).toHaveBeenCalledWith(
      expectedConfig,
      expectedQuery,
    );
    expect(store.getActions()).toEqual([
      { type: actionTypes.FETCH_ACCOUNT_SETTINGS_REQUEST, meta: { hash } },
      {
        type: actionTypes.FETCH_ACCOUNT_SETTINGS_FAILURE,
        payload: { error: expectedError },
        meta: { hash },
      },
    ]);
  });

  it('should create the correct actions in case the fetch settings procedure is successful', async () => {
    (getAccountSettings as jest.Mock).mockResolvedValueOnce(
      mockAccountSettings,
    );

    await fetchAccountSettings()(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(mockAccountSettings);
    });

    expect(getAccountSettings).toHaveBeenCalledTimes(1);
    expect(getAccountSettings).toHaveBeenCalledWith(
      expectedConfig,
      expectedQuery,
    );
    expect(store.getActions()).toEqual([
      { type: actionTypes.FETCH_ACCOUNT_SETTINGS_REQUEST, meta: { hash } },
      {
        payload: mockAccountSettings,
        type: actionTypes.FETCH_ACCOUNT_SETTINGS_SUCCESS,
        meta: { hash },
      },
    ]);
  });
});
