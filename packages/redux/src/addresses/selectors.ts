import {
  getAddresses as addressesGetter,
  getAddress as addressGetter,
  getAddressSchema as addressSchemaGetter,
  getError as errorGetter,
  getDefaultAddressDetails,
  getIsLoading,
  getPredictionDetails as predictionsDetailsGetter,
  getPredictions as predictionsGetter,
  getResult as Result,
} from './reducer';
import { getEntities, getEntityById } from '../entities/selectors/entity';
import type {
  AddressEntity,
  AddressesEntity,
  AddressSchemaEntity,
  SchemaEntity,
} from '../entities/types';
import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { State } from './types';
import type { StoreState } from '../types';

/**
 * Returns the result of the addresses area.
 *
 * @param state - Application state.
 *
 * @returns Array containing the loaded addresses id.
 */
export const getResult = (state: StoreState): State['result'] =>
  Result(state.addresses);

/**
 * Returns the error of the addresses area.
 *
 * @param state - Application state.
 *
 * @returns Address information object.
 */
export const getError = (state: StoreState): State['error'] =>
  errorGetter(state.addresses);

/**
 * Returns the loading status of the addresses area.
 *
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const isAddressesLoading = (state: StoreState): State['isLoading'] =>
  getIsLoading(state.addresses);

/**
 * Returns the addresses entity that contains all user addresses.
 *
 * @param state - Application state.
 *
 * @returns Object containing all the currently loaded addresses.
 */
export const getAddresses = (state: StoreState): AddressesEntity =>
  getEntities(state, 'addresses');

/**
 * Returns a specific address with the specified 'addressId'.
 *
 * @param state     - Application state.
 * @param addressId - Address id.
 *
 * @returns Address information object.
 */
export const getAddress = (
  state: StoreState,
  addressId: AddressEntity['id'],
): AddressEntity | undefined => getEntityById(state, 'addresses', addressId);

/**
 * Returns a list with all addresses schemas in the application state.
 *
 * @param state - Application state.
 *
 * @returns - Schemas with the correspondent Iso code.
 */
export const getSchemas = (state: StoreState): AddressSchemaEntity =>
  getEntities(state, 'addressSchema');

/**
 * Returns a specific schema with the specified 'Iso code'.
 *
 * @param state   - Application state.
 * @param isoCode - Iso code or CountryId (deprecated).
 *
 * @returns Schema information object.
 */
export const getSchema = (
  state: StoreState,
  isoCode: string,
): SchemaEntity | undefined => getEntityById(state, 'addressSchema', isoCode);

/**
 * Returns the error or loading status of each sub-area.
 */

/**
 * @param state - Application state.
 *
 * @returns Predictions details.
 */
export const getPredictions = (
  state: StoreState,
): State['predictions']['result'] => predictionsGetter(state.addresses).result;

/**
 * @param state - Application state.
 *
 * @returns Error details.
 */
export const getPredictionsError = (
  state: StoreState,
): State['predictions']['error'] => predictionsGetter(state.addresses).error;

/**
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const isPredictionsLoading = (
  state: StoreState,
): State['predictions']['isLoading'] =>
  predictionsGetter(state.addresses).isLoading;

/**
 * @param state - Application state.
 *
 * @returns Predictions details.
 */
export const getPredictionDetails = (
  state: StoreState,
): State['predictionDetails']['result'] =>
  predictionsDetailsGetter(state.addresses).result;

/**
 * @param state - Application state.
 *
 * @returns Error details.
 */
export const getPredictionDetailsError = (
  state: StoreState,
): State['predictionDetails']['error'] =>
  predictionsDetailsGetter(state.addresses).error;

/**
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const isPredictionDetailsLoading = (
  state: StoreState,
): State['predictionDetails']['isLoading'] =>
  predictionsDetailsGetter(state.addresses).isLoading;

/**
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const isAddressesListLoading = (
  state: StoreState,
): State['addresses']['isLoading'] =>
  addressesGetter(state.addresses).isLoading;

/**
 * @param state - Application state.
 *
 * @returns Error details.
 */
export const getAddressesListError = (
  state: StoreState,
): State['addresses']['error'] => addressesGetter(state.addresses).error;

/**
 * @param state     - Application state.
 * @param addressId - Address identifier.
 *
 * @returns Loader status.
 */
export const isAddressLoading = (
  state: StoreState,
  addressId: AddressEntity['id'],
): boolean | undefined => addressGetter(state.addresses).isLoading[addressId];

/**
 * @param state     - Application state.
 * @param addressId - Address identifier.
 *
 * @returns Error details.
 */
export const getAddressError = (
  state: StoreState,
  addressId: AddressEntity['id'],
): BlackoutError | null | undefined =>
  addressGetter(state.addresses).error[addressId];

/**
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const isAddressSchemaLoading = (
  state: StoreState,
): State['addressSchema']['isLoading'] =>
  addressSchemaGetter(state.addresses).isLoading;

/**
 * @param state - Application state.
 *
 * @returns Error details.
 */
export const getAddressSchemaError = (
  state: StoreState,
): State['addressSchema']['error'] =>
  addressSchemaGetter(state.addresses).error;

/**
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const isDefaultAddressDetailsLoading = (
  state: StoreState,
): State['defaultAddressDetails']['isLoading'] =>
  getDefaultAddressDetails(state.addresses).isLoading;

/**
 * @param state - Application state.
 *
 * @returns Error details.
 */
export const getDefaultAddressDetailsError = (
  state: StoreState,
): State['defaultAddressDetails']['error'] =>
  getDefaultAddressDetails(state.addresses).error;

/**
 * @param state - Application state.
 *
 * @returns Address details result.
 */
export const getDefaultAddressDetailsResult = (
  state: StoreState,
): State['defaultAddressDetails']['result'] =>
  getDefaultAddressDetails(state.addresses).result;
