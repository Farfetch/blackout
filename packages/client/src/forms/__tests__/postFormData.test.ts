import { postFormData } from '../';
import { postFormDataResponse } from 'tests/__fixtures__/forms';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postFormData.fixtures';
import moxios from 'moxios';

describe('schemas client', () => {
  const expectedConfig = undefined;
  const schemaCode = 'test';

  const payload = {
    formData: { ...postFormDataResponse.formData },
  };

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('postFormData()', () => {
    const spy = jest.spyOn(client, 'post');

    it('should handle a client request successfully', async () => {
      fixtures.post.success(schemaCode, postFormDataResponse);

      expect.assertions(2);

      await expect(
        postFormData(schemaCode, payload, expectedConfig),
      ).resolves.toBe(postFormDataResponse);

      expect(spy).toHaveBeenCalledWith(
        `/communication/v1/forms/${schemaCode}/data`,
        payload,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixtures.post.error(schemaCode);

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
