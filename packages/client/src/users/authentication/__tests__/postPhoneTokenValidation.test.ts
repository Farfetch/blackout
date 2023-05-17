import { postPhoneTokenValidation } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/postPhoneTokenValidation.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

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

    await expect(postPhoneTokenValidation(data)).resolves.toBe(200);
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/users/phoneTokenValidations',
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(postPhoneTokenValidation(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/users/phoneTokenValidations',
      data,
      expectedConfig,
    );
  });
});
