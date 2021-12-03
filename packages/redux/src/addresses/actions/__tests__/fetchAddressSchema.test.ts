import { actionTypes } from '../..';
import {
  expectedGetAddressSchemaNormalizedPayload,
  isoCode,
  mockGetAddressSchemaResponse,
} from 'tests/__fixtures__/addresses';
import { fetchAddressSchema } from '..';
import { getSchema } from '@farfetch/blackout-client/addresses';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/addresses', () => ({
  ...jest.requireActual('@farfetch/blackout-client/addresses'),
  getSchema: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('fetchAddressSchema() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct actions for when the get address schema procedure fails', async () => {
    const expectedError = new Error('get address schema details error');

    getSchema.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchAddressSchema(isoCode));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getSchema).toHaveBeenCalledTimes(1);
      expect(getSchema).toHaveBeenCalledWith(isoCode, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            meta: { isoCode },
            type: actionTypes.FETCH_ADDRESS_SCHEMA_REQUEST,
          },
          {
            type: actionTypes.FETCH_ADDRESS_SCHEMA_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get address details procedure is successful', async () => {
    getSchema.mockResolvedValueOnce(mockGetAddressSchemaResponse);
    await store.dispatch(fetchAddressSchema(isoCode));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(getSchema).toHaveBeenCalledTimes(1);
    expect(getSchema).toHaveBeenCalledWith(isoCode, expectedConfig);
    expect(actionResults).toMatchObject([
      {
        meta: { isoCode },
        type: actionTypes.FETCH_ADDRESS_SCHEMA_REQUEST,
      },
      {
        type: actionTypes.FETCH_ADDRESS_SCHEMA_SUCCESS,
        payload: expectedGetAddressSchemaNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_ADDRESS_SCHEMA_SUCCESS,
      }),
    ).toMatchSnapshot('get address schema success payload');
  });
});
