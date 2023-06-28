import { type AddressType } from '@farfetch/blackout-client';
import {
  validateShippingAddressZipCode,
  ZipCodeValidationError,
} from '../index.js';

const eircodeRegex =
  '^(?=.{7,8}$)^([AC-FHKNPRTV-Y]{1}[0-9]{2}|D6W)[ ]?[0-9AC-FHKNPRTV-Y]{4}$';

describe('validateShippingAddressZipCode', () => {
  const mockAddressSchema = [
    {
      addressSchemaLines: [
        {
          id: '9a24c613-18c5-4b0d-a789-d79369777262',
          parentId: '00000000-0000-0000-0000-000000000000',
          name: 'Postal Code',
          position: 0,
          type: 'FreeText',
          validationRegex: eircodeRegex,
          apiMapping: 'ZipCode',
          isMandatory: true,
          maxLength: 45,
          minLength: 1,
          column: 0,
          row: 0,
        },
      ],
      addressType: 'Shipping' as AddressType,
    },
  ];

  it('should return true if the zipCode is valid', async () => {
    const mockAddress = {
      addressLine1: 'Ireland Address',
      city: {
        countryId: 0,
        id: 0,
        name: 'Ireland',
      },
      country: {
        alpha2Code: 'IE',
        id: 98,
        name: 'Ireland',
        continentId: 1,
      },
      zipCode: 'D02 N725',
    };

    expect(
      await validateShippingAddressZipCode(mockAddress, mockAddressSchema),
    ).toEqual({
      isValid: true,
    });
  });

  it('should return false if the country is one of the countries to validate and zipCode is invalid', async () => {
    const mockAddress = {
      addressLine1: 'Ireland Address',
      city: {
        countryId: 0,
        id: 0,
        name: 'Ireland',
      },
      country: {
        alpha2Code: 'IE',
        id: 98,
        name: 'Ireland',
        continentId: 1,
      },
      zipCode: 'D025',
    };

    expect(
      await validateShippingAddressZipCode(mockAddress, mockAddressSchema),
    ).toEqual({
      isValid: false,
      error: ZipCodeValidationError.ZipCodeInvalid,
    });
  });

  it('should return false if there is no address schema', async () => {
    const mockAddress = {
      addressLine1: 'Ireland Address',
      city: {
        countryId: 0,
        id: 0,
        name: 'Ireland',
      },
      country: {
        alpha2Code: 'IE',
        id: 98,
        name: 'Ireland',
        continentId: 1,
      },
      zipCode: 'D025',
    };

    expect(await validateShippingAddressZipCode(mockAddress, [])).toEqual({
      isValid: false,
      error: ZipCodeValidationError.ZipCodeSchemaNotFoundError,
    });
  });
});
