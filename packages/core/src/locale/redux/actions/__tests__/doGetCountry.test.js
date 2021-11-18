import { doGetCountry } from '../';
import { mockCountry, mockCountryCode } from 'tests/__fixtures__/locale';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const localeMockStore = (state = {}) => mockStore({ locale: reducer() }, state);

describe('doGetCountry() action creator', () => {
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
  const getCountry = jest.fn();
  const action = doGetCountry(getCountry);
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
      await store.dispatch(action(mockCountryCode));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCountry).toHaveBeenCalledTimes(1);
      expect(getCountry).toHaveBeenCalledWith(mockCountryCode, expectedConfig);
      expect(store.getActions()).toEqual([
        {
          meta: { countryCode: mockCountryCode },
          type: actionTypes.GET_COUNTRY_REQUEST,
        },
        {
          meta: { countryCode: mockCountryCode },
          payload: { error: expectedError },
          type: actionTypes.GET_COUNTRY_FAILURE,
        },
      ]);
    }
  });

  it('should create the correct actions for when the get country procedure is successful', async () => {
    getCountry.mockResolvedValueOnce(mockCountry);

    await store.dispatch(action(mockCountryCode));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCountry).toHaveBeenCalledTimes(1);
    expect(getCountry).toHaveBeenCalledWith(mockCountryCode, expectedConfig);
    expect(actionResults).toEqual([
      {
        meta: { countryCode: mockCountryCode },
        type: actionTypes.GET_COUNTRY_REQUEST,
      },
      expect.objectContaining({
        meta: { countryCode: mockCountryCode },
        payload: expect.any(Object),
        type: actionTypes.GET_COUNTRY_SUCCESS,
      }),
    ]);
    expect(
      find(actionResults, {
        meta: { countryCode: mockCountryCode },
        type: actionTypes.GET_COUNTRY_SUCCESS,
      }),
    ).toMatchSnapshot('Get country success payload');
  });
});
