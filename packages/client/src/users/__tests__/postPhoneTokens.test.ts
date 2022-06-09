import { postPhoneTokens } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postPhoneTokens.fixtures';
import mswServer from '../../../tests/mswServer';

describe('postPhoneTokens', () => {
  const expectedConfig = undefined;
  const data = {
    phoneNumber: '123456789',
  };
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = {};

    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(postPhoneTokens(data)).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/users/phoneTokens',
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(postPhoneTokens(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/users/phoneTokens',
      data,
      expectedConfig,
    );
  });
});
