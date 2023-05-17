import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type CountryAddressSchema,
  type GetCountryAddressSchemas,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchCountryAddressSchemasAction } from '../../types/index.js';

/**
 * Obtains the address schemas for a country specified with 'id'.
 *
 * @param getCountryAddressSchemas - Get country address schemas client.
 *
 * @returns Thunk factory.
 */
const fetchCountryAddressSchemasFactory =
  (getCountryAddressSchemas: GetCountryAddressSchemas) =>
  (isoCode: string, config?: Config) =>
  async (
    dispatch: Dispatch<FetchCountryAddressSchemasAction>,
  ): Promise<CountryAddressSchema[]> => {
    try {
      dispatch({
        meta: { isoCode },
        type: actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMAS_REQUEST,
      });

      const result = await getCountryAddressSchemas(isoCode, config);

      const schemaEntity = {
        entities: {
          countriesAddressSchemas: {
            [isoCode]: result,
          },
        },
        result: isoCode,
      };

      dispatch({
        payload: schemaEntity,
        type: actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMAS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMAS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchCountryAddressSchemasFactory;
