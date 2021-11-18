import { getSchema } from '../';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/getSchema.fixtures';
import moxios from 'moxios';

describe('getSchema', () => {
  const expectedConfig = undefined;
  const id = '123456';
  const spy = jest.spyOn(client, 'get');
  const response = {
    addressSchemaLines: [
      {
        name: 'FirstName',
        position: 0,
        type: 'FreeText',
        validationRegex: '^.{1,45}$',
        apiMapping: 'FirstName',
        isMandatory: true,
        maxLength: 45,
        minLength: 1,
        column: 0,
        row: 0,
      },
      {
        name: 'LastName',
        position: 0,
        type: 'FreeText',
        validationRegex: '^.{1,45}$',
        apiMapping: 'LastName',
        isMandatory: true,
        maxLength: 45,
        minLength: 1,
        column: 1,
        row: 0,
      },
      {
        name: 'StreetLine1',
        position: 1,
        type: 'FreeText',
        validationRegex: '^.{1,250}$',
        apiMapping: 'AddressLine1',
        isMandatory: true,
        maxLength: 250,
        minLength: 1,
        column: 0,
        row: 1,
      },
      {
        name: 'StreetLine2',
        position: 2,
        type: 'FreeText',
        validationRegex: '^.{0,500}$',
        apiMapping: 'AddressLine2',
        isMandatory: false,
        maxLength: 500,
        minLength: 0,
        column: 0,
        row: 2,
      },
      {
        name: 'StreetLine3',
        position: 3,
        type: 'FreeText',
        validationRegex: '^.{0,250}$',
        apiMapping: 'AddressLine3',
        isMandatory: false,
        maxLength: 250,
        minLength: 0,
        column: 0,
        row: 3,
      },
      {
        name: 'AdministrativeArea',
        position: 4,
        type: 'FreeText',
        validationRegex: '^.{1,150}$',
        apiMapping: 'City',
        isMandatory: true,
        maxLength: 150,
        minLength: 1,
        column: 0,
        row: 4,
      },
      {
        name: 'Municipality',
        position: 4,
        type: 'FreeText',
        validationRegex: '^.{0,150}$',
        apiMapping: 'State',
        isMandatory: false,
        maxLength: 150,
        minLength: 0,
        column: 1,
        row: 4,
      },
      {
        name: 'PostalCode',
        position: 5,
        type: 'FreeText',
        validationRegex: '^.{1,50}$',
        apiMapping: 'ZipCode',
        isMandatory: true,
        maxLength: 50,
        minLength: 1,
        column: 0,
        row: 5,
      },
      {
        name: 'Phone',
        position: 5,
        type: 'PhoneNumber',
        validationRegex:
          '^(?=.{1,50}$)^(?!.*([\\s\\+\\-\\#\\*\\.\\(\\)\\[\\]])\\1)([\\d\\s\\+\\-\\#\\*\\.\\(\\)\\[\\]])+$',
        apiMapping: 'Phone',
        isMandatory: true,
        maxLength: 50,
        minLength: 1,
        column: 1,
        row: 5,
      },
    ],
  };
  const newIsoCode = 'PT';
  const newResponse = {
    ...response,
    addressType: 'any',
  };

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getSchema', () => {
    describe('Legacy', () => {
      it('should handle a client request successfully', async () => {
        fixture.legacy.success({ id, response });

        expect.assertions(2);
        await expect(getSchema(id)).resolves.toBe(response);
        expect(spy).toHaveBeenCalledWith(
          `/legacy/v1/addressbook/schema/${id}`,
          expectedConfig,
        );
      });

      it('should receive a client request error', async () => {
        fixture.legacy.failure({ id });

        expect.assertions(2);

        await expect(getSchema(id)).rejects.toMatchSnapshot();
        expect(spy).toHaveBeenCalledWith(
          `/legacy/v1/addressbook/schema/${id}`,
          expectedConfig,
        );
      });
    });

    describe('Account Service', () => {
      it('should handle a client request successfully', async () => {
        fixture.accsvc.success({ id: newIsoCode, response: newResponse });

        expect.assertions(2);
        await expect(getSchema(newIsoCode)).resolves.toBe(newResponse);
        expect(spy).toHaveBeenCalledWith(
          `/account/v1/countries/${newIsoCode}/addressSchemas`,
          expectedConfig,
        );
      });

      it('should receive a client request error', async () => {
        fixture.accsvc.failure({ id: newIsoCode });

        expect.assertions(2);

        await expect(getSchema(newIsoCode)).rejects.toMatchSnapshot();
        expect(spy).toHaveBeenCalledWith(
          `/account/v1/countries/${newIsoCode}/addressSchemas`,
          expectedConfig,
        );
      });
    });
  });
});
