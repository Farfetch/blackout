import { postPhoneNumberValidations } from '../';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postPhoneNumberValidations.fixtures';
import mswServer from '../../../tests/mswServer';

describe('postPhoneNumberValidations', () => {
  const expectedConfig = undefined;
  const data = {
    phoneNumber: '123456789',
    token: 'q1w2e3',
  };
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = {};

    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(postPhoneNumberValidations(data)).resolves.toStrictEqual(
      response,
    );
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/users/phoneNumberValidations',
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(postPhoneNumberValidations(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/users/phoneNumberValidations',
      data,
      expectedConfig,
    );
  });
});
