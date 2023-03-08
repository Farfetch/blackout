import { postPhoneToken } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/postPhoneToken.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('postPhoneToken', () => {
  const expectedConfig = undefined;
  const data = {
    phoneNumber: '123456789',
  };
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    await expect(postPhoneToken(data)).resolves.toBe(200);
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/users/phoneTokens',
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(postPhoneToken(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/users/phoneTokens',
      data,
      expectedConfig,
    );
  });
});
