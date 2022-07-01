import * as actionTypes from '../../actionTypes';
import {
  Config,
  CountryAddressSchema,
  GetCountryAddressSchemas,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchCountryAddressSchemaAction } from '../../types';

/**
 * Obtains the address schema for a country specified with 'id'.
 *
 * @param getCountryAddressSchemas - Get country address schemas client.
 *
 * @returns Thunk factory.
 */
const fetchCountryAddressSchemasFactory =
  (getCountryAddressSchemas: GetCountryAddressSchemas) =>
  (isoCode: string, config?: Config) =>
  async (
    dispatch: Dispatch<FetchCountryAddressSchemaAction>,
  ): Promise<CountryAddressSchema[]> => {
    try {
      dispatch({
        meta: { isoCode },
        type: actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMA_REQUEST,
      });
      const result = await getCountryAddressSchemas(isoCode, config);

      const schemaEntity = {
        entities: {
          countryAddressSchema: {
            [isoCode]: result,
          },
        },
        result: isoCode,
      };

      dispatch({
        payload: schemaEntity,
        type: actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMA_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_COUNTRY_ADDRESS_SCHEMA_FAILURE,
      });

      throw error;
    }
  };

export default fetchCountryAddressSchemasFactory;
