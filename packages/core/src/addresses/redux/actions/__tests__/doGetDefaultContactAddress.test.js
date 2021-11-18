import { mockGetAddressResponse } from '../../__fixtures__/addresses.fixtures';
import { mockStore } from '../../../../../tests';
import doGetDefaultContactAddress from '../doGetDefaultContactAddress';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doGetDefaultContactAddress() action creator', () => {
  const getDefaultContactAddress = jest.fn();
  const userId = '121212';

  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct actions for when the get default contact address details procedure fails', async () => {
    const action = doGetDefaultContactAddress(getDefaultContactAddress);
    const expectedError = new Error('get default contact address error');

    getDefaultContactAddress.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getDefaultContactAddress).toHaveBeenCalledTimes(1);
      expect(getDefaultContactAddress).toHaveBeenCalledWith(
        userId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.GET_DEFAULT_CONTACT_ADDRESS_REQUEST,
          },
          {
            type: actionTypes.GET_DEFAULT_CONTACT_ADDRESS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get address details procedure is successful', async () => {
    const action = doGetDefaultContactAddress(getDefaultContactAddress);
    const expectedResponse = { ...mockGetAddressResponse };

    getDefaultContactAddress.mockResolvedValueOnce(mockGetAddressResponse);
    await store.dispatch(action(userId));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(getDefaultContactAddress).toHaveBeenCalledTimes(1);
    expect(getDefaultContactAddress).toHaveBeenCalledWith(
      userId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.GET_DEFAULT_CONTACT_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.GET_DEFAULT_CONTACT_ADDRESS_SUCCESS,
        payload: expectedResponse,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('get default contact address success payload');
  });
});
