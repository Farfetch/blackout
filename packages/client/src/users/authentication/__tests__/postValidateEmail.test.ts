import { postValidateEmail } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postValidateEmail.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('postEmailTokenValidate', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  const requestData = {
    username: 'pepe@acme.com',
    token: 'TOKEN_EVA_01',
  };

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    expect.assertions(2);
    await expect(postValidateEmail(requestData)).resolves.toMatchObject(
      expect.objectContaining({
        status: 204,
      }),
    );

    expect(spy).toHaveBeenCalledWith(
      '/account/v1/emailtokensvalidation',
      requestData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);
    await expect(postValidateEmail(requestData)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      '/account/v1/emailtokensvalidation',
      requestData,
      expectedConfig,
    );
  });
});
