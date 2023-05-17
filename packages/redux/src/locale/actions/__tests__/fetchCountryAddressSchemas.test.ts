import * as actionTypes from '../../actionTypes.js';
import {
  expectedGetAddressSchemaNormalizedPayload,
  isoCode,
  mockGetAddressSchemaResponse,
} from 'tests/__fixtures__/locale/index.mjs';
import { fetchCountryAddressSchemas } from '../index.js';
import { find } from 'lodash-es';
import { getCountryAddressSchemas } from '@farfetch/blackout-client';
import { INITIAL_STATE_LOCALE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCountryAddressSchemas: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE_LOCALE.countriesAddressSchemas }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof addressesMockStore>;

describe('fetchCountryAddressSchema() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct actions for when the get address schema procedure fails', async () => {
    const expectedError = new Error('get address schema details error');

    (getCountryAddressSchemas as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () => await fetchCountryAddressSchemas(isoCode)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getCountryAddressSchemas).toHaveBeenCalledTimes(1);
    expect(getCountryAddressSchemas).toHaveBeenCalledWith(
      isoCode,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          meta: { isoCode },
          type: actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMAS_REQUEST,
        },
        {
          type: actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMAS_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the get address schema procedure is successful', async () => {
    (getCountryAddressSchemas as jest.Mock).mockResolvedValueOnce(
      mockGetAddressSchemaResponse,
    );

    await fetchCountryAddressSchemas(isoCode)(store.dispatch).then(
      clientResult => {
        expect(clientResult).toBe(mockGetAddressSchemaResponse);
      },
    );

    const actionResults = store.getActions();

    expect(getCountryAddressSchemas).toHaveBeenCalledTimes(1);
    expect(getCountryAddressSchemas).toHaveBeenCalledWith(
      isoCode,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        meta: { isoCode },
        type: actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMAS_REQUEST,
      },
      {
        type: actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMAS_SUCCESS,
        payload: expectedGetAddressSchemaNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMAS_SUCCESS,
      }),
    ).toMatchSnapshot('get address schema success payload');
  });
});
