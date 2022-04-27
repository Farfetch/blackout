import { postPhoneNumberValidations } from '../';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postPhoneNumberValidations.fixtures';
import moxios from 'moxios';

describe('postPhoneNumberValidations', () => {
  const expectedConfig = undefined;
  const data = {
    phoneNumber: '123456789',
    token: 'q1w2e3',
  };
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({ response });

    expect.assertions(2);

    await expect(postPhoneNumberValidations(data)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/users/phoneNumberValidations',
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure();

    expect.assertions(2);

    await expect(postPhoneNumberValidations(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/users/phoneNumberValidations',
      data,
      expectedConfig,
    );
  });
});
