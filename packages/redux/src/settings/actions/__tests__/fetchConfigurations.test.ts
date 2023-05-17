import * as actionTypes from '../../actionTypes.js';
import { fetchConfigurations } from '../index.js';
import { getConfigurations } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/configurations.js';
import {
  mockConfigurations,
  mockConfigurationsNormalizedResponse,
} from 'tests/__fixtures__/settings/index.mjs';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getConfigurations: jest.fn(),
}));

const buildConfigurationsMockStore = (state = {}) =>
  mockStore({ configurations: INITIAL_STATE }, state);
const expectedConfig = undefined;
const expectedQuery = undefined;
let store: ReturnType<typeof buildConfigurationsMockStore>;

describe('fetchConfigurations() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = buildConfigurationsMockStore();
  });

  it('should create the correct actions in case the fetch configurations procedure fails', async () => {
    const expectedError = new Error('fetch configurations error');

    (getConfigurations as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchConfigurations()(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getConfigurations).toHaveBeenCalledTimes(1);
    expect(getConfigurations).toHaveBeenCalledWith(
      expectedConfig,
      expectedQuery,
    );
    expect(store.getActions()).toEqual([
      { type: actionTypes.FETCH_CONFIGURATIONS_REQUEST },
      {
        type: actionTypes.FETCH_CONFIGURATIONS_FAILURE,
        payload: { error: expectedError },
      },
    ]);
  });

  it('should create the correct actions in case the fetch configurations procedure is successful', async () => {
    (getConfigurations as jest.Mock).mockResolvedValueOnce(mockConfigurations);

    await fetchConfigurations()(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(mockConfigurations);
    });

    expect(getConfigurations).toHaveBeenCalledTimes(1);
    expect(getConfigurations).toHaveBeenCalledWith(
      expectedConfig,
      expectedQuery,
    );
    expect(store.getActions()).toEqual([
      { type: actionTypes.FETCH_CONFIGURATIONS_REQUEST },
      {
        payload: mockConfigurationsNormalizedResponse,
        type: actionTypes.FETCH_CONFIGURATIONS_SUCCESS,
      },
    ]);
  });
});
