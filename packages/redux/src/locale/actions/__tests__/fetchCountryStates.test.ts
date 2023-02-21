import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import { fetchCountryStates } from '..';
import { getCountryStates } from '@farfetch/blackout-client';
import { INITIAL_STATE_LOCALE } from '../../reducer';
import { mockCountryCode, mockStates } from 'tests/__fixtures__/locale';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

const localeMockStore = (state = {}) =>
  mockStore({ locale: INITIAL_STATE_LOCALE }, state);

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCountryStates: jest.fn(),
}));

describe('fetchCountryStates() action creator', () => {
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const expectedConfig = undefined;

  let store: ReturnType<typeof localeMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();

    store = localeMockStore();
  });

  it('should create the correct actions for when the get states procedure fails', async () => {
    const expectedError = new Error('Get states error');

    (getCountryStates as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchCountryStates(mockCountryCode)(store.dispatch),
    ).rejects.toThrow(expectedError);

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
  });

  it('should create the correct actions for when the get states procedure is successful', async () => {
    (getCountryStates as jest.Mock).mockResolvedValueOnce(mockStates);

    const actionResults = store.getActions();

    await fetchCountryStates(mockCountryCode)(store.dispatch).then(
      clientResult => {
        expect(clientResult).toBe(mockStates);
      },
    );

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
