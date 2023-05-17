import * as actionTypes from '../../actionTypes.js';
import * as normalizr from 'normalizr';
import { fetchCountryStateCities } from '../index.js';
import { find } from 'lodash-es';
import { getCountryStateCities } from '@farfetch/blackout-client';
import { INITIAL_STATE_LOCALE } from '../../reducer.js';
import {
  mockCities,
  mockCountryCode,
  mockStateId,
} from 'tests/__fixtures__/locale/index.mjs';
import { mockStore } from '../../../../tests/index.js';

const localeMockStore = (state = {}) =>
  mockStore({ locale: INITIAL_STATE_LOCALE }, state);

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCountryStateCities: jest.fn(),
}));

describe('fetchCountryStateCities() action creator', () => {
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const expectedConfig = undefined;

  let store: ReturnType<typeof localeMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();

    store = localeMockStore();
  });

  it('should create the correct actions for when the get cities procedure fails', async () => {
    const expectedError = new Error('Get cities error');

    (getCountryStateCities as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await fetchCountryStateCities(
          mockCountryCode,
          mockStateId,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getCountryStateCities).toHaveBeenCalledTimes(1);
    expect(getCountryStateCities).toHaveBeenCalledWith(
      mockCountryCode,
      mockStateId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: {
          countryCode: mockCountryCode,
          stateId: mockStateId,
        },
        type: actionTypes.FETCH_COUNTRY_STATE_CITIES_REQUEST,
      },
      {
        meta: {
          countryCode: mockCountryCode,
          stateId: mockStateId,
        },
        payload: { error: expectedError },
        type: actionTypes.FETCH_COUNTRY_STATE_CITIES_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the get product details procedure is successful', async () => {
    (getCountryStateCities as jest.Mock).mockResolvedValueOnce(mockCities);

    const actionResults = store.getActions();

    await fetchCountryStateCities(
      mockCountryCode,
      mockStateId,
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(mockCities);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCountryStateCities).toHaveBeenCalledTimes(1);
    expect(getCountryStateCities).toHaveBeenCalledWith(
      mockCountryCode,
      mockStateId,
      expectedConfig,
    );
    expect(actionResults).toEqual([
      {
        meta: {
          countryCode: mockCountryCode,
          stateId: mockStateId,
        },
        type: actionTypes.FETCH_COUNTRY_STATE_CITIES_REQUEST,
      },
      expect.objectContaining({
        meta: {
          countryCode: mockCountryCode,
          stateId: mockStateId,
        },
        payload: expect.any(Object),
        type: actionTypes.FETCH_COUNTRY_STATE_CITIES_SUCCESS,
      }),
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_COUNTRY_STATE_CITIES_SUCCESS,
      }),
    ).toMatchSnapshot('Get cities success payload');
  });
});
