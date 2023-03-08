import * as actionTypes from '../../actionTypes.js';
import * as normalizr from 'normalizr';
import { fetchCountry } from '../index.js';
import { find } from 'lodash-es';
import { getCountry } from '@farfetch/blackout-client';
import { INITIAL_STATE_LOCALE as INITIAL_STATE } from '../../reducer.js';
import {
  mockCountry,
  mockCountryCode,
} from 'tests/__fixtures__/locale/index.mjs';
import { mockStore } from '../../../../tests/index.js';

const localeMockStore = (state = {}) =>
  mockStore({ locale: INITIAL_STATE }, state);

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCountry: jest.fn(),
}));

describe('fetchCountry() action creator', () => {
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const expectedConfig = undefined;

  let store: ReturnType<typeof localeMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();

    store = localeMockStore();
  });

  it('should create the correct actions for when the get country procedure fails', async () => {
    const expectedError = new Error('Get country error');

    (getCountry as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchCountry(mockCountryCode)(store.dispatch),
    ).rejects.toThrow(expectedError);

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
  });

  it('should create the correct actions for when the get country procedure is successful', async () => {
    (getCountry as jest.Mock).mockResolvedValueOnce(mockCountry);

    const actionResults = store.getActions();

    await fetchCountry(mockCountryCode)(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(mockCountry);
    });

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
