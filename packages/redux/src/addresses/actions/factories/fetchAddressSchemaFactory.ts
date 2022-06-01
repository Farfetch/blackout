import {
  FETCH_ADDRESS_SCHEMA_FAILURE,
  FETCH_ADDRESS_SCHEMA_REQUEST,
  FETCH_ADDRESS_SCHEMA_SUCCESS,
} from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { FetchAddressSchemaAction } from '../../types';
import type {
  GetSchema,
  Schema,
} from '@farfetch/blackout-client/addresses/types';

/**
 * @param isoCode - IsoCode.
 * @param config  - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Obtains the address schema for a country specified with 'id'.
 *
 * @param getSchema - Get schema client.
 *
 * @returns Thunk factory.
 */
const fetchAddressSchemaFactory =
  (getSchema: GetSchema) =>
  (isoCode: string, config?: Config) =>
  async (dispatch: Dispatch<FetchAddressSchemaAction>): Promise<Schema> => {
    dispatch({
      meta: { isoCode },
      type: FETCH_ADDRESS_SCHEMA_REQUEST,
    });

    try {
      const result = await getSchema(isoCode, config);

      const schemaEntity = {
        entities: {
          addressSchema: {
            [isoCode]: result,
          },
        },
        result: isoCode,
      };

      dispatch({
        payload: schemaEntity,
        type: FETCH_ADDRESS_SCHEMA_SUCCESS,
      });

      return result;
    } catch (error: any) {
      dispatch({
        payload: { error },
        type: FETCH_ADDRESS_SCHEMA_FAILURE,
      });

      throw error;
    }
  };

export default fetchAddressSchemaFactory;
