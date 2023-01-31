import { postPhoneTokenValidations } from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postPhoneTokenValidations.fixtures';
import moxios from 'moxios';

describe('postPhoneTokenValidations', () => {
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

    await expect(postPhoneTokenValidations(data)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/users/phoneTokenValidations',
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({});

    expect.assertions(2);

    await expect(postPhoneTokenValidations(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/users/phoneTokenValidations',
      data,
      expectedConfig,
    );
  });
});
