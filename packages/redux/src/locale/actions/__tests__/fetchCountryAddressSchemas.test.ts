import * as actionTypes from '../../actionTypes';
import {
  expectedGetAddressSchemaNormalizedPayload,
  isoCode,
  mockGetAddressSchemaResponse,
} from 'tests/__fixtures__/locale';
import { fetchCountryAddressSchemas } from '..';
import { getCountryAddressSchemas } from '@farfetch/blackout-client';
import { INITIAL_STATE_LOCALE } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCountryAddressSchemas: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE_LOCALE.countryAddressSchema }, state);

const expectedConfig = undefined;
let store;

describe('fetchCountryAddressSchema() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct actions for when the get address schema procedure fails', async () => {
    const expectedError = new Error('get address schema details error');

    getCountryAddressSchemas.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchCountryAddressSchemas(isoCode));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCountryAddressSchemas).toHaveBeenCalledTimes(1);
      expect(getCountryAddressSchemas).toHaveBeenCalledWith(
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
    getCountryAddressSchemas.mockResolvedValueOnce(
      mockGetAddressSchemaResponse,
    );
    await store.dispatch(fetchCountryAddressSchemas(isoCode));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(getCountryAddressSchemas).toHaveBeenCalledTimes(1);
    expect(getCountryAddressSchemas).toHaveBeenCalledWith(
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
