import * as actionTypes from '../../actionTypes.js';
import * as normalizr from 'normalizr';
import { fetchCountries } from '../index.js';
import { find } from 'lodash-es';
import { getCountries } from '@farfetch/blackout-client';
import { INITIAL_STATE_LOCALE } from '../../reducer.js';
import {
  mockCitiesEntities,
  mockCountries,
  mockCountriesEntities,
  mockCountry,
  mockCountryIE,
  mockCountryPT,
  mockStatesEntities,
} from 'tests/__fixtures__/locale/index.mjs';
import { mockStore } from '../../../../tests/index.js';

const localeMockStore = (state = {}) =>
  mockStore({ locale: INITIAL_STATE_LOCALE }, state);

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCountries: jest.fn(),
}));

describe('fetchCountries() action creator', () => {
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const expectedConfig = undefined;

  let store: ReturnType<typeof localeMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();

    store = localeMockStore();
  });

  it('should create the correct actions for when the get countries procedure fails', async () => {
    const expectedError = new Error('Get countries error');

    (getCountries as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchCountries()(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getCountries).toHaveBeenCalledTimes(1);
    expect(getCountries).toHaveBeenCalledWith(expectedConfig);
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_COUNTRIES_REQUEST,
      },
      {
        payload: { error: expectedError },
        type: actionTypes.FETCH_COUNTRIES_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the get countries procedure is successful', async () => {
    (getCountries as jest.Mock).mockResolvedValueOnce(mockCountries);

    const actionResults = store.getActions();

    await fetchCountries()(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(mockCountries);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCountries).toHaveBeenCalledTimes(1);
    expect(getCountries).toHaveBeenCalledWith(expectedConfig);
    expect(actionResults).toEqual([
      {
        type: actionTypes.FETCH_COUNTRIES_REQUEST,
      },
      expect.objectContaining({
        payload: {
          result: [mockCountry.code, mockCountryPT.code, mockCountryIE.code],
          entities: {
            countries: mockCountriesEntities,
            states: mockStatesEntities,
            cities: mockCitiesEntities,
          },
        },
        type: actionTypes.FETCH_COUNTRIES_SUCCESS,
      }),
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_COUNTRIES_SUCCESS,
      }),
    ).toMatchSnapshot('Get countries success payload');
  });
});
