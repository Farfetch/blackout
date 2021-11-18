import {
  expectedGetAddressSchemaNormalizedPayload,
  isoCode,
  mockGetAddressSchemaResponse,
} from '../../__fixtures__/addresses.fixtures';
import { mockStore } from '../../../../../tests';
import doGetAddressSchema from '../doGetAddressSchema';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doGetAddressSchema() action creator', () => {
  const getSchema = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct actions for when the get address schema procedure fails', async () => {
    const action = doGetAddressSchema(getSchema);
    const expectedError = new Error('get address schema details error');

    getSchema.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(isoCode));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getSchema).toHaveBeenCalledTimes(1);
      expect(getSchema).toHaveBeenCalledWith(isoCode, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            meta: { isoCode },
            type: actionTypes.GET_ADDRESS_SCHEMA_REQUEST,
          },
          {
            type: actionTypes.GET_ADDRESS_SCHEMA_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get address details procedure is successful', async () => {
    const action = doGetAddressSchema(getSchema);

    getSchema.mockResolvedValueOnce(mockGetAddressSchemaResponse);
    await store.dispatch(action(isoCode));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(getSchema).toHaveBeenCalledTimes(1);
    expect(getSchema).toHaveBeenCalledWith(isoCode, expectedConfig);
    expect(actionResults).toMatchObject([
      {
        meta: { isoCode },
        type: actionTypes.GET_ADDRESS_SCHEMA_REQUEST,
      },
      {
        type: actionTypes.GET_ADDRESS_SCHEMA_SUCCESS,
        payload: expectedGetAddressSchemaNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_ADDRESS_SCHEMA_SUCCESS,
      }),
    ).toMatchSnapshot('get address schema success payload');
  });
});
