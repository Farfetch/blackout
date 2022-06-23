import { getFormSchema } from '../';
import {
  query,
  formSchemaResponse as successResponse,
} from 'tests/__fixtures__/forms';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getFormSchema.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('schemas client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getFormSchema()', () => {
    const spy = jest.spyOn(client, 'get');
    const schemaCode = 'test';

    it('should handle a client request successfully', async () => {
      fixtures.get.success({ schemaCode, query, response: successResponse });

      expect.assertions(2);

      await expect(
        getFormSchema(schemaCode, query, expectedConfig),
      ).resolves.toEqual(successResponse);

      expect(spy).toHaveBeenCalledWith(
        join(`/communication/v1/forms/${schemaCode}`, {
          query,
        }),
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixtures.get.failure();

      expect.assertions(2);

      await expect(
        getFormSchema(schemaCode, query, expectedConfig),
      ).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        join(`/communication/v1/forms/${schemaCode}`, {
          query,
        }),
        expectedConfig,
      );
    });
  });
});
