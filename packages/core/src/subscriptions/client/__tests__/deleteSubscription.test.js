import { deleteSubscription } from '..';
import client from '../../../helpers/client';
import fixtures from '../__mocks__/deleteSubscription.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('deleteSubscription', () => {
  const expectedConfig = undefined;
  const id = 'c3e39b1f-69a8-47e3-ab7f-743ddd1278bc';
  const emailHash =
    '1ca9c02be7e27f42bdfdca1afef2618003bbdc7d08fe2e9b54d2ac5af8b37127';

  const spy = jest.spyOn(client, 'delete');

  beforeEach(() => {
    moxios.install(client);
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({ id, emailHash }, response);

    await expect(deleteSubscription({ id, emailHash })).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/subscriptions', { query: { id, emailHash } }),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ id, emailHash });

    await expect(
      deleteSubscription({ id, emailHash }),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/subscriptions', { query: { id, emailHash } }),
      expectedConfig,
    );
  });
});
