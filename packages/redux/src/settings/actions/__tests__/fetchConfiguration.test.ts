import * as actionTypes from '../../actionTypes.js';
import { getConfiguration } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/configuration.js';
import {
  mockConfiguration,
  mockConfigurationCode,
  mockConfigurationNormalizedResponse,
} from 'tests/__fixtures__/settings/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import fetchConfiguration from '../fetchConfiguration.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getConfiguration: jest.fn(),
}));

const buildConfigurationMockStore = (state = {}) =>
  mockStore({ configurations: INITIAL_STATE }, state);
const expectedConfig = undefined;
const expectedQuery = undefined;
let store: ReturnType<typeof buildConfigurationMockStore>;

describe('fetchConfiguration() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = buildConfigurationMockStore();
  });

  it('should create the correct actions in case the fetch configuration procedure fails', async () => {
    const expectedError = new Error('fetch configuration error');

    (getConfiguration as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await fetchConfiguration(mockConfigurationCode)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getConfiguration).toHaveBeenCalledTimes(1);
    expect(getConfiguration).toHaveBeenCalledWith(
      mockConfigurationCode,
      expectedConfig,
      expectedQuery,
    );
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_CONFIGURATION_REQUEST,
        meta: { code: mockConfigurationCode },
      },
      {
        type: actionTypes.FETCH_CONFIGURATION_FAILURE,
        payload: { error: expectedError },
        meta: { code: mockConfigurationCode },
      },
    ]);
  });

  it('should create the correct actions in case the fetch configuration procedure is successful', async () => {
    (getConfiguration as jest.Mock).mockResolvedValueOnce(mockConfiguration);

    await fetchConfiguration(mockConfigurationCode)(store.dispatch).then(
      clientResult => {
        expect(clientResult).toBe(mockConfiguration);
      },
    );

    expect(getConfiguration).toHaveBeenCalledTimes(1);
    expect(getConfiguration).toHaveBeenCalledWith(
      mockConfigurationCode,
      expectedConfig,
      expectedQuery,
    );
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_CONFIGURATION_REQUEST,
        meta: { code: mockConfigurationCode },
      },
      {
        payload: mockConfigurationNormalizedResponse,
        meta: { code: mockConfigurationCode },
        type: actionTypes.FETCH_CONFIGURATION_SUCCESS,
      },
    ]);
  });
});
