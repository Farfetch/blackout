import { postPhoneToken } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postPhoneToken.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('postPhoneToken', () => {
  const expectedConfig = undefined;
  const data = {
    phoneNumber: '123456789',
  };
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    expect.assertions(2);

    await expect(postPhoneToken(data)).resolves.toBe(200);
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/users/phoneTokens',
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(postPhoneToken(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/users/phoneTokens',
      data,
      expectedConfig,
    );
  });
});
