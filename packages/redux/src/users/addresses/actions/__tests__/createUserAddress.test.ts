import * as actionTypes from '../../actionTypes.js';
import * as normalizr from 'normalizr';
import { createUserAddress } from '../index.js';
import {
  address4 as data,
  expectedPostUserAddressNormalizedPayload,
  mockPostUserAddressResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { postUserAddress } from '@farfetch/blackout-client';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postUserAddress: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store: ReturnType<typeof addressesMockStore>;

describe('createUserAddress() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore({ entities: { user: { id: userId } } });
  });

  it('should create the correct actions for when the create user address procedure fails', async () => {
    const expectedError = new Error('create address error');

    (postUserAddress as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await createUserAddress(userId, data)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(postUserAddress).toHaveBeenCalledTimes(1);
    expect(postUserAddress).toHaveBeenCalledWith(
      { userId },
      data,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          type: actionTypes.CREATE_USER_ADDRESS_REQUEST,
        },
        {
          type: actionTypes.CREATE_USER_ADDRESS_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the create user address procedure is successful', async () => {
    (postUserAddress as jest.Mock).mockResolvedValueOnce(
      mockPostUserAddressResponse,
    );

    const result = await createUserAddress(userId, data)(store.dispatch);
    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(postUserAddress).toHaveBeenCalledTimes(1);
    expect(postUserAddress).toHaveBeenCalledWith(
      { userId },
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.CREATE_USER_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.CREATE_USER_ADDRESS_SUCCESS,
        payload: expectedPostUserAddressNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_USER_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('create user address success payload');
    expect(result).toEqual(mockPostUserAddressResponse);
  });
});
