import { doGetCities } from '../';
import {
  mockCities,
  mockCountryCode,
  mockStateId,
} from 'tests/__fixtures__/locale';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const localeMockStore = (state = {}) => mockStore({ locale: reducer() }, state);

describe('doGetCities() action creator', () => {
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
  const getCities = jest.fn();
  const action = doGetCities(getCities);
  const expectedConfig = undefined;

  let store;

  beforeEach(() => {
    jest.clearAllMocks();

    store = localeMockStore();
  });

  it('should create the correct actions for when the get cities procedure fails', async () => {
    const expectedError = new Error('Get cities error');

    getCities.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockCountryCode, mockStateId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCities).toHaveBeenCalledTimes(1);
      expect(getCities).toHaveBeenCalledWith(
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
          type: actionTypes.GET_CITIES_REQUEST,
        },
        {
          meta: {
            countryCode: mockCountryCode,
            stateId: mockStateId,
          },
          payload: { error: expectedError },
          type: actionTypes.GET_CITIES_FAILURE,
        },
      ]);
    }
  });

  it('should create the correct actions for when the get product details procedure is successful', async () => {
    getCities.mockResolvedValueOnce(mockCities);

    await store.dispatch(action(mockCountryCode, mockStateId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCities).toHaveBeenCalledTimes(1);
    expect(getCities).toHaveBeenCalledWith(
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
        type: actionTypes.GET_CITIES_REQUEST,
      },
      expect.objectContaining({
        meta: {
          countryCode: mockCountryCode,
          stateId: mockStateId,
        },
        payload: expect.any(Object),
        type: actionTypes.GET_CITIES_SUCCESS,
      }),
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_CITIES_SUCCESS,
      }),
    ).toMatchSnapshot('Get cities success payload');
  });
});
