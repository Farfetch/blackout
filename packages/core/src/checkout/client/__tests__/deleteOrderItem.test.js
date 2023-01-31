import * as checkoutClient from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/deleteOrderItem.fixtures';
import moxios from 'moxios';

describe('deleteOrderItem', () => {
  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  const spy = jest.spyOn(client, 'delete');
  const expectedConfig = undefined;
  const id = '123456';
  const itemId = 37445623;
  const urlToBeCalled = `/checkout/v1/orders/${id}/items/${itemId}`;

  it('should handle a client request successfully', async () => {
    fixtures.success({
      id,
      itemId,
    });

    expect.assertions(2);
    await expect(checkoutClient.deleteOrderItem(id, itemId)).resolves.toBe(200);
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure({
      id,
      itemId,
    });

    expect.assertions(2);
    await expect(
      checkoutClient.deleteOrderItem(id, itemId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
