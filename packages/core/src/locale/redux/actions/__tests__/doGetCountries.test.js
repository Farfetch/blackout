import { doGetCountries } from '../';
import { mockCountries, mockQuery } from 'tests/__fixtures__/locale';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const localeMockStore = (state = {}) => mockStore({ locale: reducer() }, state);

describe('doGetCountries() action creator', () => {
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
  const getCountries = jest.fn();
  const action = doGetCountries(getCountries);
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
      await store.dispatch(action(mockQuery));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCountries).toHaveBeenCalledTimes(1);
      expect(getCountries).toHaveBeenCalledWith(mockQuery, expectedConfig);
      expect(store.getActions()).toEqual([
        {
          type: actionTypes.GET_COUNTRIES_REQUEST,
        },
        {
          payload: { error: expectedError },
          type: actionTypes.GET_COUNTRIES_FAILURE,
        },
      ]);
    }
  });

  it('should create the correct actions for when the get countries procedure is successful', async () => {
    getCountries.mockResolvedValueOnce(mockCountries);

    await store.dispatch(action(mockQuery));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCountries).toHaveBeenCalledTimes(1);
    expect(getCountries).toHaveBeenCalledWith(mockQuery, expectedConfig);
    expect(actionResults).toEqual([
      {
        type: actionTypes.GET_COUNTRIES_REQUEST,
      },
      expect.objectContaining({
        payload: expect.any(Object),
        type: actionTypes.GET_COUNTRIES_SUCCESS,
      }),
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_COUNTRIES_SUCCESS,
      }),
    ).toMatchSnapshot('Get countries success payload');
  });
});
