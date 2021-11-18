import { deleteSubscriptions } from '..';
import client from '../../../helpers/client';
import fixtures from '../__mocks__/deleteSubscriptions.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('deleteSubscriptions', () => {
  const expectedConfig = undefined;

  const emailHash =
    '1ca9c02be7e27f42bdfdca1afef2618003bbdc7d08fe2e9b54d2ac5af8b37127';

  const spy = jest.spyOn(client, 'delete');

  beforeEach(() => {
    moxios.install(client);
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success(emailHash, response);

    await expect(deleteSubscriptions(emailHash)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/subscriptions', emailHash),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure(emailHash);

    await expect(deleteSubscriptions(emailHash)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/subscriptions', emailHash),
      expectedConfig,
    );
  });
});
