import { doGetCurrencies } from '../';
import { mockCountryCode, mockCurrencies } from 'tests/__fixtures__/locale';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const localeMockStore = (state = {}) => mockStore({ locale: reducer() }, state);

describe('doGetCurrencies() action creator', () => {
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
  const getCurrencies = jest.fn();
  const action = doGetCurrencies(getCurrencies);
  const expectedConfig = undefined;

  let store;

  beforeEach(() => {
    jest.clearAllMocks();

    store = localeMockStore();
  });

  it('should create the correct actions for when the get currencies procedure fails', async () => {
    const expectedError = new Error('Get currencies error');

    getCurrencies.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockCountryCode));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCurrencies).toHaveBeenCalledTimes(1);
      expect(getCurrencies).toHaveBeenCalledWith(
        mockCountryCode,
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          meta: {
            countryCode: mockCountryCode,
          },
          type: actionTypes.GET_CURRENCIES_REQUEST,
        },
        {
          meta: {
            countryCode: mockCountryCode,
          },
          payload: { error: expectedError },
          type: actionTypes.GET_CURRENCIES_FAILURE,
        },
      ]);
    }
  });

  it('should create the correct actions for when the get currencies procedure is successful', async () => {
    getCurrencies.mockResolvedValueOnce(mockCurrencies);

    await store.dispatch(action(mockCountryCode));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCurrencies).toHaveBeenCalledTimes(1);
    expect(getCurrencies).toHaveBeenCalledWith(mockCountryCode, expectedConfig);
    expect(actionResults).toEqual([
      {
        meta: {
          countryCode: mockCountryCode,
        },
        type: actionTypes.GET_CURRENCIES_REQUEST,
      },
      expect.objectContaining({
        meta: {
          countryCode: mockCountryCode,
        },
        payload: expect.any(Object),
        type: actionTypes.GET_CURRENCIES_SUCCESS,
      }),
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_CURRENCIES_SUCCESS,
      }),
    ).toMatchSnapshot('Get currencies success payload');
  });
});
