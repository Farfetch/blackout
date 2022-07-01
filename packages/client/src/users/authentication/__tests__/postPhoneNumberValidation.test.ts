import { postPhoneNumberValidation } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postPhoneNumberValidation.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('postPhoneNumberValidation', () => {
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

    await expect(postPhoneNumberValidation(data)).resolves.toBe(200);
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/users/phoneNumberValidations',
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(postPhoneNumberValidation(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/users/phoneNumberValidations',
      data,
      expectedConfig,
    );
  });
});
