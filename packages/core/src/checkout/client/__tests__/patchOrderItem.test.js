import * as checkoutClient from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/patchOrderItem.fixtures';
import moxios from 'moxios';

describe('patchOrderItem', () => {
  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  const spy = jest.spyOn(client, 'patch');
  const expectedConfig = undefined;
  const id = '123456';
  const itemId = 37445623;
  const orderItemUpdateData = {
    quantity: 5,
  };
  const urlToBeCalled = `/checkout/v1/orders/${id}/items/${itemId}`;

  it('should handle a client request successfully', async () => {
    fixtures.success({
      id,
      itemId,
      orderItemUpdateData,
    });

    expect.assertions(2);
    await expect(
      checkoutClient.patchOrderItem(id, itemId, orderItemUpdateData),
    ).resolves.toBe(200);
    expect(spy).toHaveBeenCalledWith(
      urlToBeCalled,
      orderItemUpdateData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({
      id,
      itemId,
      orderItemUpdateData,
    });

    expect.assertions(2);
    await expect(
      checkoutClient.patchOrderItem(id, itemId, orderItemUpdateData),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      urlToBeCalled,
      orderItemUpdateData,
      expectedConfig,
    );
  });
});
