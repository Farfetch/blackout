import { getFormSchema } from '..//index.js';
import {
  query,
  schemaCode,
  formSchemaResponse as successResponse,
} from 'tests/__fixtures__/forms/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getFormSchema.fixtures.js';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer.js';

describe('schemas client', () => {
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('getFormSchema()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(successResponse));

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
      mswServer.use(fixtures.failure());

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
