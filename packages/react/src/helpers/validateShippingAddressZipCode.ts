import {
  type AddressBase,
  AddressType,
  type CountryAddressSchema,
} from '@farfetch/blackout-client';

/**
 * Zip Code Validation Errors
 * * ER01 - The zip code validation is ignored because is not included in the countries array to be validated
 * * ER02 - Zip code schema not found
 * * ER03 - The zip code inserted is invalid
 */
export enum ZipCodeValidationError {
  ZipCodeValidationCountryIgnored = 'ER01',
  ZipCodeSchemaNotFoundError = 'ER02',
  ZipCodeInvalid = 'ER03',
}

/**
 * Validates zip code for an array of iso-codes.
 * If the passed address' zip code is valid will return true and false with the error code `ZipCodeInvalid` if not valid.
 * For the case that the address' country code is not in the array of isoCodesToValidate,
 * it will return false and the error code `ZipCodeValidationCountryIgnored`
 *
 * @param address - address
 * @param addressSchemas - address schemas to test.
 * @param isoCodesToValidate - iso codes to be validated.
 *
 * @returns - an object with isValid and error code if exist
 * */
export default function validateShippingAddressZipCode(
  address: AddressBase,
  addressSchemas: CountryAddressSchema[],
  isoCodesToValidate: string[] = [],
): { isValid: boolean; error?: ZipCodeValidationError } {
  if (!isoCodesToValidate.includes(address.country.alpha2Code)) {
    return {
      isValid: false,
      error: ZipCodeValidationError.ZipCodeValidationCountryIgnored,
    };
  }

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
