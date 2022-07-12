import * as normalizr from 'normalizr';
import {
  localeActionTypes as actionTypes,
  localeReducer as INITIAL_STATE,
} from '../..';
import { fetchCountryStates } from '..';
import { getCountryStates } from '@farfetch/blackout-client/locale';
import { mockCountryCode, mockStates } from 'tests/__fixtures__/locale';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';
import type { States } from '@farfetch/blackout-client/locale/types';

const localeMockStore = (state = {}) =>
  mockStore({ locale: INITIAL_STATE }, state);

jest.mock('@farfetch/blackout-client/locale', () => ({
  ...jest.requireActual('@farfetch/blackout-client/locale'),
  getCountryStates: jest.fn(),
}));

describe('fetchCountryStates() action creator', () => {
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const expectedConfig = undefined;

  let store;

  beforeEach(() => {
    jest.clearAllMocks();

    store = localeMockStore();
  });

  it('should create the correct actions for when the get states procedure fails', async () => {
    const expectedError = new Error('Get states error');

    getCountryStates.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(fetchCountryStates(mockCountryCode));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCountryStates).toHaveBeenCalledTimes(1);
      expect(getCountryStates).toHaveBeenCalledWith(
        mockCountryCode,
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          meta: {
            countryCode: mockCountryCode,
          },
          type: actionTypes.FETCH_COUNTRY_STATES_REQUEST,
        },
        {
          meta: {
            countryCode: mockCountryCode,
          },
          payload: { error: expectedError },
          type: actionTypes.FETCH_COUNTRY_STATES_FAILURE,
        },
      ]);
    }
  });

  it('should create the correct actions for when the get states procedure is successful', async () => {
    getCountryStates.mockResolvedValueOnce(mockStates);

    const actionResults = store.getActions();

    await store
      .dispatch(fetchCountryStates(mockCountryCode))
      .then((result: States) => expect(result).toBe(mockStates));

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCountryStates).toHaveBeenCalledTimes(1);
    expect(getCountryStates).toHaveBeenCalledWith(
      mockCountryCode,
      expectedConfig,
    );
    expect(actionResults).toEqual([
      {
        meta: {
          countryCode: mockCountryCode,
        },
        type: actionTypes.FETCH_COUNTRY_STATES_REQUEST,
      },
      expect.objectContaining({
        meta: {
          countryCode: mockCountryCode,
        },
        payload: expect.any(Object),
        type: actionTypes.FETCH_COUNTRY_STATES_SUCCESS,
      }),
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_COUNTRY_STATES_SUCCESS,
      }),
    ).toMatchSnapshot('Get states success payload');
  });
});
