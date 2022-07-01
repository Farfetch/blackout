import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import { AddressType, postUserAddress } from '@farfetch/blackout-client';
import { createUserAddress } from '..';
import {
  expectedPostUserAddressNormalizedPayload,
  mockPostUserAddressResponse,
  userId,
} from 'tests/__fixtures__/users';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postUserAddress: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store;

describe('createUserAddress() action creator', () => {
  const data = {
    id: '',
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    vatNumber: '',
    city: {
      id: 0,
      name: '',
      stateId: 0,
      countryId: 0,
    },
    state: {
      code: '',
      countryId: 0,
      id: 0,
      name: '',
    },
    country: {
      id: 0,
      name: '',
      nativeName: '',
      alpha2Code: '',
      alpha3Code: '',
      culture: '',
      region: '',
      continentId: 0,
    },
    zipCode: '',
    phone: '',
    neighbourhood: '',
    ddd: '',
    continent: {
      id: 0,
      name: '',
      countries: [
        {
          id: 0,
          name: '',
          nativeName: '',
          alpha2Code: '',
          alpha3Code: '',
          culture: '',
          region: '',
          continentId: 0,
        },
      ],
    },
    addressType: AddressType.Any,
    identityDocument: '',
    customsClearanceCode: '',
    title: '',
    isCurrentShipping: false,
    isCurrentBilling: false,
    isCurrentPreferred: false,
    createdDate: '',
    updatedDate: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore({ entities: { user: { id: userId } } });
  });

  it('should create the correct actions for when the create address procedure fails', async () => {
    const expectedError = new Error('create address error');

    postUserAddress.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(createUserAddress(userId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
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
    }
  });

  it('should create the correct actions for when the create address procedure is successful', async () => {
    postUserAddress.mockResolvedValueOnce(mockPostUserAddressResponse);
    const result = await store.dispatch(createUserAddress(userId, data));
    const actionResults = store.getActions();

    expect.assertions(6);
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
    ).toMatchSnapshot('create address success payload');
    expect(result).toEqual(mockPostUserAddressResponse);
  });
});
