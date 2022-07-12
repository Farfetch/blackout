import * as normalizr from 'normalizr';
import {
  localeActionTypes as actionTypes,
  localeReducer as INITIAL_STATE,
} from '../..';
import { fetchCountryCities } from '..';
import { getCountryCities } from '@farfetch/blackout-client/locale';
import {
  mockCities,
  mockCountryCode,
  mockStateId,
} from 'tests/__fixtures__/locale';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';
import type { Cities } from '@farfetch/blackout-client/locale/types';

const localeMockStore = (state = {}) =>
  mockStore({ locale: INITIAL_STATE }, state);

jest.mock('@farfetch/blackout-client/locale', () => ({
  ...jest.requireActual('@farfetch/blackout-client/locale'),
  getCountryCities: jest.fn(),
}));

describe('fetchCountryCities() action creator', () => {
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const expectedConfig = undefined;

  let store;

  beforeEach(() => {
    jest.clearAllMocks();

    store = localeMockStore();
  });

  it('should create the correct actions for when the get cities procedure fails', async () => {
    const expectedError = new Error('Get cities error');

    getCountryCities.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(fetchCountryCities(mockCountryCode, mockStateId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCountryCities).toHaveBeenCalledTimes(1);
      expect(getCountryCities).toHaveBeenCalledWith(
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
          type: actionTypes.FETCH_COUNTRY_CITIES_REQUEST,
        },
        {
          meta: {
            countryCode: mockCountryCode,
            stateId: mockStateId,
          },
          payload: { error: expectedError },
          type: actionTypes.FETCH_COUNTRY_CITIES_FAILURE,
        },
      ]);
    }
  });

  it('should create the correct actions for when the get product details procedure is successful', async () => {
    getCountryCities.mockResolvedValueOnce(mockCities);

    const actionResults = store.getActions();

    await store
      .dispatch(fetchCountryCities(mockCountryCode, mockStateId))
      .then((result: Cities) => expect(result).toBe(mockCities));

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCountryCities).toHaveBeenCalledTimes(1);
    expect(getCountryCities).toHaveBeenCalledWith(
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
        type: actionTypes.FETCH_COUNTRY_CITIES_REQUEST,
      },
      expect.objectContaining({
        meta: {
          countryCode: mockCountryCode,
          stateId: mockStateId,
        },
        payload: expect.any(Object),
        type: actionTypes.FETCH_COUNTRY_CITIES_SUCCESS,
      }),
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_COUNTRY_CITIES_SUCCESS,
      }),
    ).toMatchSnapshot('Get cities success payload');
  });
});
