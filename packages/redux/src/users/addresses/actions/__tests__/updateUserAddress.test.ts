import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import {
  addressId2,
  expectedUpdateAddressNormalizedPayload,
  mockUpdateAddressResponse,
  userId,
} from 'tests/__fixtures__/users';
import { AddressType, putUserAddress } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../../tests';
import { updateUserAddress } from '..';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  putUserAddress: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store;

describe('updateUserAddress() action creator', () => {
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

  it('should create the correct actions for when the update address procedure fails', async () => {
    const expectedError = new Error('update address error');

    putUserAddress.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(updateUserAddress(userId, addressId2, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(putUserAddress).toHaveBeenCalledTimes(1);
      expect(putUserAddress).toHaveBeenCalledWith(
        { userId, id: addressId2 },
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            meta: { addressId: addressId2 },
            type: actionTypes.UPDATE_USER_ADDRESS_REQUEST,
          },
          {
            meta: { addressId: addressId2 },
            type: actionTypes.UPDATE_USER_ADDRESS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the update address procedure is successful', async () => {
    putUserAddress.mockResolvedValueOnce(mockUpdateAddressResponse);
    await store.dispatch(updateUserAddress(userId, addressId2, data));

    const actionResults = store.getActions();

    expect.assertions(5);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(putUserAddress).toHaveBeenCalledTimes(1);
    expect(putUserAddress).toHaveBeenCalledWith(
      { userId, id: addressId2 },
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.UPDATE_USER_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.UPDATE_USER_ADDRESS_SUCCESS,
        payload: expectedUpdateAddressNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_USER_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('update address success payload');
  });
});
