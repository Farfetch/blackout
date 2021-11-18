import {
  expectedGetAddressesNormalizedPayload,
  mockGetAddressesResponse,
  userId,
} from '../../__fixtures__/addresses.fixtures';
import { mockStore } from '../../../../../tests';
import doGetAddresses from '../doGetAddresses';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: reducer() }, state);

const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
const expectedConfig = undefined;
let store;

describe('doGetAddresses() action creator', () => {
  const getAddresses = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore({ entities: { user: { id: userId } } });
  });

  it('should create the correct actions for when the get addresses procedure fails', async () => {
    const action = doGetAddresses(getAddresses);
    const expectedError = new Error('get adresses error');

    getAddresses.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action());
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getAddresses).toHaveBeenCalledTimes(1);
      expect(getAddresses).toHaveBeenCalledWith({ userId }, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_ADDRESSES_REQUEST },
          {
            type: actionTypes.GET_ADDRESSES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get address book procedure is successful', async () => {
    const action = doGetAddresses(getAddresses);

    getAddresses.mockResolvedValueOnce(mockGetAddressesResponse);
    await store.dispatch(action());

    const actionResults = store.getActions();

    expect.assertions(5);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getAddresses).toHaveBeenCalledTimes(1);
    expect(getAddresses).toHaveBeenCalledWith({ userId }, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_ADDRESSES_REQUEST },
      {
        type: actionTypes.GET_ADDRESSES_SUCCESS,
        payload: expectedGetAddressesNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_ADDRESSES_SUCCESS,
      }),
    ).toMatchSnapshot('get addresses success payload');
  });
});
