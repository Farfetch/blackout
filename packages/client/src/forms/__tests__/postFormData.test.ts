import { postFormData } from '..//index.js';
import {
  postFormDataResponse,
  schemaCode,
} from 'tests/__fixtures__/forms/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/postFormData.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('schemas client', () => {
  const expectedConfig = undefined;

  const payload = {
    formData: { ...postFormDataResponse.formData },
  };

  beforeEach(() => jest.clearAllMocks());

  describe('postFormData()', () => {
    const spy = jest.spyOn(client, 'post');

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(postFormDataResponse));

      await expect(
        postFormData(schemaCode, payload, expectedConfig),
      ).resolves.toStrictEqual(postFormDataResponse);

      expect(spy).toHaveBeenCalledWith(
        `/communication/v1/forms/${schemaCode}/data`,
        payload,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        postFormData(schemaCode, payload, expectedConfig),
      ).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        `/communication/v1/forms/${schemaCode}/data`,
        payload,
        expectedConfig,
      );
    });
  });
});
