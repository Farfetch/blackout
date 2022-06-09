import { postFormData } from '../';
import { postFormDataResponse } from 'tests/__fixtures__/forms';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postFormData.fixtures';
import mswServer from '../../../tests/mswServer';

describe('schemas client', () => {
  const expectedConfig = undefined;
  const schemaCode = 'test';

  const payload = {
    formData: { ...postFormDataResponse.formData },
  };

  beforeEach(() => jest.clearAllMocks());

  describe('postFormData()', () => {
    const spy = jest.spyOn(client, 'post');

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(postFormDataResponse));

      expect.assertions(2);

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

      expect.assertions(2);

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
