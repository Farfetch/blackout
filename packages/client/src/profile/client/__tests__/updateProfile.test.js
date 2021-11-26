import * as profileClient from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/updateProfile.fixtures';
import moxios from 'moxios';

describe('updateProfile', () => {
  const expectedConfig = undefined;
  const profileId = '123456';
  const data = {};
  const spy = jest.spyOn(client, 'put');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.update.success({ response, profileId });

    expect.assertions(2);

    await expect(profileClient.updateProfile(profileId, data)).resolves.toBe(
      response,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${profileId}`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.update.failure({ profileId });

    expect.assertions(2);

    await expect(
      profileClient.updateProfile(profileId, data),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${profileId}`,
      data,
      expectedConfig,
    );
  });
});
