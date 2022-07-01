import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import { Country, getCountry } from '@farfetch/blackout-client';
import { fetchCountry } from '..';
import { INITIAL_STATE_LOCALE as INITIAL_STATE } from '../../reducer';
import { mockCountry, mockCountryCode } from 'tests/__fixtures__/locale';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

const localeMockStore = (state = {}) =>
  mockStore({ locale: INITIAL_STATE }, state);

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCountry: jest.fn(),
}));

describe('fetchCountry() action creator', () => {
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const expectedConfig = undefined;

  let store;

  beforeEach(() => {
    jest.clearAllMocks();

    store = localeMockStore();
  });

  it('should create the correct actions for when the get country procedure fails', async () => {
    const expectedError = new Error('Get country error');

    getCountry.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(fetchCountry(mockCountryCode));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCountry).toHaveBeenCalledTimes(1);
      expect(getCountry).toHaveBeenCalledWith(mockCountryCode, expectedConfig);
      expect(store.getActions()).toEqual([
        {
          meta: { countryCode: mockCountryCode },
          type: actionTypes.FETCH_COUNTRY_REQUEST,
        },
        {
          meta: { countryCode: mockCountryCode },
          payload: { error: expectedError },
          type: actionTypes.FETCH_COUNTRY_FAILURE,
        },
      ]);
    }
  });

  it('should create the correct actions for when the get country procedure is successful', async () => {
    getCountry.mockResolvedValueOnce(mockCountry);

    const actionResults = store.getActions();

    await store
      .dispatch(fetchCountry(mockCountryCode))
      .then((result: Country) => expect(result).toBe(mockCountry));

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCountry).toHaveBeenCalledTimes(1);
    expect(getCountry).toHaveBeenCalledWith(mockCountryCode, expectedConfig);
    expect(actionResults).toEqual([
      {
        meta: { countryCode: mockCountryCode },
        type: actionTypes.FETCH_COUNTRY_REQUEST,
      },
      expect.objectContaining({
        meta: { countryCode: mockCountryCode },
        payload: expect.any(Object),
        type: actionTypes.FETCH_COUNTRY_SUCCESS,
      }),
    ]);
    expect(
      find(actionResults, {
        meta: { countryCode: mockCountryCode },
        type: actionTypes.FETCH_COUNTRY_SUCCESS,
      }),
    ).toMatchSnapshot('Get country success payload');
  });
});
