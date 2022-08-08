import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import { Country, getCountries } from '@farfetch/blackout-client';
import { fetchCountries } from '..';
import { INITIAL_STATE_LOCALE } from '../../reducer';
import {
  mockCitiesEntities,
  mockCountries,
  mockCountriesEntities,
  mockCountry,
  mockCountryPT,
  mockStatesEntities,
} from 'tests/__fixtures__/locale';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

const localeMockStore = (state = {}) =>
  mockStore({ locale: INITIAL_STATE_LOCALE }, state);

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCountries: jest.fn(),
}));

describe('fetchCountries() action creator', () => {
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const expectedConfig = undefined;

  let store;

  beforeEach(() => {
    jest.clearAllMocks();

    store = localeMockStore();
  });

  it('should create the correct actions for when the get countries procedure fails', async () => {
    const expectedError = new Error('Get countries error');

    getCountries.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(fetchCountries());
    } catch (error) {
      expect(error).toBe(expectedError);
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
    }
  });

  it('should create the correct actions for when the get countries procedure is successful', async () => {
    getCountries.mockResolvedValueOnce(mockCountries);

    const actionResults = store.getActions();

    await store
      .dispatch(fetchCountries())
      .then((result: Country) => expect(result).toBe(mockCountries));

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCountries).toHaveBeenCalledTimes(1);
    expect(getCountries).toHaveBeenCalledWith(expectedConfig);
    expect(actionResults).toEqual([
      {
        type: actionTypes.FETCH_COUNTRIES_REQUEST,
      },
      expect.objectContaining({
        payload: {
          result: [mockCountry.code, mockCountryPT.code],
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
