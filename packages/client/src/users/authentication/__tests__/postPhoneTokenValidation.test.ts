import { postPhoneTokenValidation } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postPhoneTokenValidation.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('postPhoneTokenValidation', () => {
  const expectedConfig = undefined;
  const data = {
    phoneNumber: '123456789',
    token: 'q1w2e3',
  };
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    expect.assertions(2);

    await expect(postPhoneTokenValidation(data)).resolves.toBe(200);
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/users/phoneTokenValidations',
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(postPhoneTokenValidation(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/users/phoneTokenValidations',
      data,
      expectedConfig,
    );
  });
});
