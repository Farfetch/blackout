import {
  actionTypesLocale as actionTypes,
  reducerLocale as INITIAL_STATE,
} from '../..';
import {
  expectedGetAddressSchemaNormalizedPayload,
  isoCode,
  mockGetAddressSchemaResponse,
} from 'tests/__fixtures__/locale';
import { fetchCountryAddressSchema } from '..';
import { getCountryAddressSchema } from '@farfetch/blackout-client';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCountryAddressSchema: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('fetchCountryAddressSchema() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct actions for when the get address schema procedure fails', async () => {
    const expectedError = new Error('get address schema details error');

    getCountryAddressSchema.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchCountryAddressSchema(isoCode));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCountryAddressSchema).toHaveBeenCalledTimes(1);
      expect(getCountryAddressSchema).toHaveBeenCalledWith(
        isoCode,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            meta: { isoCode },
            type: actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMA_REQUEST,
          },
          {
            type: actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMA_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get address schema procedure is successful', async () => {
    getCountryAddressSchema.mockResolvedValueOnce(mockGetAddressSchemaResponse);
    await store.dispatch(fetchCountryAddressSchema(isoCode));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(getCountryAddressSchema).toHaveBeenCalledTimes(1);
    expect(getCountryAddressSchema).toHaveBeenCalledWith(
      isoCode,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        meta: { isoCode },
        type: actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMA_REQUEST,
      },
      {
        type: actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMA_SUCCESS,
        payload: expectedGetAddressSchemaNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMA_SUCCESS,
      }),
    ).toMatchSnapshot('get address schema success payload');
  });
});
