import {
  expectedPostAddressNormalizedPayload,
  mockPostAddressResponse,
  userId,
} from '../../__fixtures__/addresses.fixtures';
import { mockStore } from '../../../../../tests';
import doCreateAddress from '../doCreateAddress';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: reducer() }, state);

const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
const expectedConfig = undefined;
let store;

describe('doCreateAddress() action creator', () => {
  const postAddress = jest.fn();
  const data = {};

  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore({ entities: { user: { id: userId } } });
  });

  it('should create the correct actions for when the create address procedure fails', async () => {
    const action = doCreateAddress(postAddress);
    const expectedError = new Error('create address error');

    postAddress.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postAddress).toHaveBeenCalledTimes(1);
      expect(postAddress).toHaveBeenCalledWith(
        { userId },
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.CREATE_ADDRESS_REQUEST,
          },
          {
            type: actionTypes.CREATE_ADDRESS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the create address procedure is successful', async () => {
    const action = doCreateAddress(postAddress);

    postAddress.mockResolvedValueOnce(mockPostAddressResponse);
    const result = await store.dispatch(action(data));
    const actionResults = store.getActions();

    expect.assertions(6);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(postAddress).toHaveBeenCalledTimes(1);
    expect(postAddress).toHaveBeenCalledWith({ userId }, data, expectedConfig);
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.CREATE_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.CREATE_ADDRESS_SUCCESS,
        payload: expectedPostAddressNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('create address success payload');
    expect(result).toEqual(expectedPostAddressNormalizedPayload);
  });
});
