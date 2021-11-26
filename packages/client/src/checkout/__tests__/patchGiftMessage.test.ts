import * as checkoutClient from '..';
import { PatchGiftMessageData } from '../types';
import client from '../../helpers/client';
import fixture from '../__fixtures__/patchGiftMessage.fixtures';
import moxios from 'moxios';

describe('checkout client', () => {
  const id = 123456;
  const expectedConfig = undefined;
  const data: PatchGiftMessageData = [
    {
      checkoutOrderItemId: 0,
      checkoutItemPatchDocument: {
        operations: [
          {
            value: {
              from: 'string',
              to: 'string',
              message: 'string',
            },
            path: 'string',
            op: 'string',
            from: 'string',
          },
        ],
      },
    },
    {
      checkoutOrderItemId: 0,
      checkoutItemPatchDocument: {
        operations: [
          {
            value: {
              from: 'string',
              to: 'string',
              message: 'string',
            },
            path: 'string',
            op: 'string',
            from: 'string',
          },
        ],
      },
    },
  ];

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('patchGiftMessage', () => {
    const spy = jest.spyOn(client, 'patch');
    const urlToBeCalled = `/checkout/v1/orders/${id}/items`;

    it('should handle a client request successfully', async () => {
      const response = 204;

      fixture.success({ id, data });

      expect.assertions(2);

      await expect(checkoutClient.patchGiftMessage(id, data)).resolves.toBe(
        response,
      );

      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixture.failure({ id, data });

      expect.assertions(2);

      await expect(
        checkoutClient.patchGiftMessage(id, data),
      ).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
