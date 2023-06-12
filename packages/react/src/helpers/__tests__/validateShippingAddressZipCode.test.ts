import { type AddressType } from '@farfetch/blackout-client';
import { validateShippingAddressZipCode } from '../index.js';

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

  it("should return true if the country isn't one of the countries to validate", async () => {
    const mockAddress = {
      addressLine1: 'Portugal Address',
      city: {
        countryId: 0,
        id: 0,
        name: 'Portugal',
      },
      country: {
        alpha2Code: 'PT',
        id: 98,
        name: 'Portugal',
        continentId: 1,
      },
      zipCode: '4444',
    };

    expect(
      await validateShippingAddressZipCode(mockAddress, mockAddressSchema, [
        'ES',
      ]),
    ).toEqual({
      isValid: false,
      error: 'ER01',
    });
  });

  it('should return true if the country is one of the countries to validate and zipCode is valid', async () => {
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
      await validateShippingAddressZipCode(mockAddress, mockAddressSchema, [
        'IE',
      ]),
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
      await validateShippingAddressZipCode(mockAddress, mockAddressSchema, [
        'IE',
      ]),
    ).toEqual({
      isValid: false,
      error: 'ER03',
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

    expect(
      await validateShippingAddressZipCode(mockAddress, [], ['IE']),
    ).toEqual({
      isValid: false,
      error: 'ER02',
    });
  });
});
