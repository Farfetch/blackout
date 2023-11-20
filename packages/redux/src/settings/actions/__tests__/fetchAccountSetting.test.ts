import * as actionTypes from '../../actionTypes.js';
import { fetchAccountSetting } from '../index.js';
import { getAccountSetting } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/accountSetting.js';
import { mockAccountSetting } from 'tests/__fixtures__/settings/index.mjs';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getAccountSetting: jest.fn(),
}));

const buildSettingMockStore = (state = {}) =>
  mockStore({ setting: INITIAL_STATE }, state);
const settingId = 'abc123';
const expectedConfig = undefined;
let store: ReturnType<typeof buildSettingMockStore>;

describe('fetchAccountSetting() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = buildSettingMockStore();
  });

  it('should create the correct actions in case the fetch setting procedure fails', async () => {
    const expectedError = new Error('fetch setting error');

    (getAccountSetting as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchAccountSetting(settingId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getAccountSetting).toHaveBeenCalledTimes(1);
    expect(getAccountSetting).toHaveBeenCalledWith(settingId, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_ACCOUNT_SETTING_REQUEST,
        meta: { id: settingId },
      },
      {
        type: actionTypes.FETCH_ACCOUNT_SETTING_FAILURE,
        payload: { error: expectedError },
        meta: { id: settingId },
      },
    ]);
  });

  it('should create the correct actions in case the fetch setting procedure is successful', async () => {
    (getAccountSetting as jest.Mock).mockResolvedValueOnce(mockAccountSetting);

    await fetchAccountSetting(settingId)(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(mockAccountSetting);
    });

    expect(getAccountSetting).toHaveBeenCalledTimes(1);
    expect(getAccountSetting).toHaveBeenCalledWith(settingId, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_ACCOUNT_SETTING_REQUEST,
        meta: { id: settingId },
      },
      {
        payload: mockAccountSetting,
        type: actionTypes.FETCH_ACCOUNT_SETTING_SUCCESS,
        meta: { id: settingId },
      },
    ]);
  });
});
