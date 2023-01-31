import { doGetStates } from '../';
import { mockCountryCode, mockStates } from 'tests/__fixtures__/locale';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const localeMockStore = (state = {}) => mockStore({ locale: reducer() }, state);

describe('doGetStates() action creator', () => {
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
  const getStates = jest.fn();
  const action = doGetStates(getStates);
  const expectedConfig = undefined;

  let store;

  beforeEach(() => {
    jest.clearAllMocks();

    store = localeMockStore();
  });

  it('should create the correct actions for when the get states procedure fails', async () => {
    const expectedError = new Error('Get states error');

    getStates.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockCountryCode));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getStates).toHaveBeenCalledTimes(1);
      expect(getStates).toHaveBeenCalledWith(mockCountryCode, expectedConfig);
      expect(store.getActions()).toEqual([
        {
          meta: {
            countryCode: mockCountryCode,
          },
          type: actionTypes.GET_STATES_REQUEST,
        },
        {
          meta: {
            countryCode: mockCountryCode,
          },
          payload: { error: expectedError },
          type: actionTypes.GET_STATES_FAILURE,
        },
      ]);
    }
  });

  it('should create the correct actions for when the get states procedure is successful', async () => {
    getStates.mockResolvedValueOnce(mockStates);

    await store.dispatch(action(mockCountryCode));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getStates).toHaveBeenCalledTimes(1);
    expect(getStates).toHaveBeenCalledWith(mockCountryCode, expectedConfig);
    expect(actionResults).toEqual([
      {
        meta: {
          countryCode: mockCountryCode,
        },
        type: actionTypes.GET_STATES_REQUEST,
      },
      expect.objectContaining({
        meta: {
          countryCode: mockCountryCode,
        },
        payload: expect.any(Object),
        type: actionTypes.GET_STATES_SUCCESS,
      }),
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_STATES_SUCCESS,
      }),
    ).toMatchSnapshot('Get states success payload');
  });
});
