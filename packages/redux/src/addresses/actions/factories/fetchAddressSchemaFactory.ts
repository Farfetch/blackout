import * as actionTypes from '../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
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
    try {
      dispatch({
        meta: { isoCode },
        type: actionTypes.FETCH_ADDRESS_SCHEMA_REQUEST,
      });
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
        type: actionTypes.FETCH_ADDRESS_SCHEMA_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_ADDRESS_SCHEMA_FAILURE,
      });

      throw error;
    }
  };

export default fetchAddressSchemaFactory;
