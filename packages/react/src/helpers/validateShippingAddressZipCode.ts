import {
  type AddressBase,
  AddressType,
  type CountryAddressSchema,
} from '@farfetch/blackout-client';

/**
 * Zip Code Validation Errors
 * * ER01 - Zip code schema not found
 * * ER02 - The zip code inserted is invalid
 */
export enum ZipCodeValidationError {
  ZipCodeSchemaNotFoundError = 'ER01',
  ZipCodeInvalid = 'ER02',
}

/**
 * Validates a zip code for a shipping address.
 * If the passed address' zip code is valid will return true and false with the error code `ZipCodeInvalid` if not valid.
 *
 * @param address - address
 * @param addressSchemas - address schemas to test.
 *
 * @returns - an object with isValid and error code if exist
 * */
export default function validateShippingAddressZipCode(
  address: AddressBase,
  addressSchemas: CountryAddressSchema[],
): { isValid: boolean; error?: ZipCodeValidationError } {
  const schema =
    addressSchemas.find(
      ({ addressType }) => addressType === AddressType.Shipping,
    ) ||
    addressSchemas.find(({ addressType }) => addressType === AddressType.Any);

  const zipCodeSchema = schema?.addressSchemaLines.find(
    ({ apiMapping }) => apiMapping === 'ZipCode',
  );

  if (!zipCodeSchema) {
    return {
      isValid: false,
      error: ZipCodeValidationError.ZipCodeSchemaNotFoundError,
    };
  }

  const regex = new RegExp(zipCodeSchema.validationRegex);
  const isZipCodeValid = regex.test(address.zipCode);

  return {
    isValid: isZipCodeValid,
    error: !isZipCodeValid ? ZipCodeValidationError.ZipCodeInvalid : undefined,
  };
}
