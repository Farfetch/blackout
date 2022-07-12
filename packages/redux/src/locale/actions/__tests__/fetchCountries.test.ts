import * as normalizr from 'normalizr';
import {
  localeActionTypes as actionTypes,
  localeReducer as INITIAL_STATE_LOCALE,
} from '../..';
import { fetchCountries } from '..';
import { getCountries } from '@farfetch/blackout-client/locale';
import { mockCountries, mockQuery } from 'tests/__fixtures__/locale';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';
import type { Countries } from '@farfetch/blackout-client/locale/types';

const localeMockStore = (state = {}) =>
  mockStore({ locale: INITIAL_STATE_LOCALE }, state);

jest.mock('@farfetch/blackout-client/locale', () => ({
  ...jest.requireActual('@farfetch/blackout-client/locale'),
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
      await store.dispatch(fetchCountries(mockQuery));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCountries).toHaveBeenCalledTimes(1);
      expect(getCountries).toHaveBeenCalledWith(mockQuery, expectedConfig);
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
      .dispatch(fetchCountries(mockQuery))
      .then((result: Countries) => expect(result).toBe(mockCountries));

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCountries).toHaveBeenCalledTimes(1);
    expect(getCountries).toHaveBeenCalledWith(mockQuery, expectedConfig);
    expect(actionResults).toEqual([
      {
        type: actionTypes.FETCH_COUNTRIES_REQUEST,
      },
      expect.objectContaining({
        payload: expect.any(Object),
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
