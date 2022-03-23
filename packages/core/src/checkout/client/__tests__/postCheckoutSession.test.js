import * as checkoutClient from '..';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/postCheckoutSession.fixtures';
import moxios from 'moxios';

describe('checkout client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('postCheckoutSession', () => {
    const data = {
      items: [
        {
          productId: 1,
          variantId: 'c377e0ef-d9ad-45be-a3e1-4e12aabb547a',
          quantity: 1,
        },
      ],
      addresses: [
        {
          addressLine1: 'Rua Marquês de Sá da Bandeira 1',
          addressLine2: 'União das freguesias de Ramada e Caneças',
          addressLine3: '1',
          country: 'PT',
          city: 'Odivelas',
          zipCode: '90120',
          phone: '213132312213123132',
          firstName: 'Shanti',
          lastName: 'Shiva',
        },
      ],
      customer: {
        email: 'test-email@farfetch.com',
      },
      metadata: {
        trackingCorrelationId: 'string',
      },
      channel: 'web',
    };
    const spy = jest.spyOn(client, 'post');
    const urlToBeCalled = '/checkoutsession';

    it('should handle a client request successfully', async () => {
      const response = {};

      fixture.success({ response });

      expect.assertions(2);
      await expect(checkoutClient.postCheckoutSession(data)).resolves.toBe(
        response,
      );
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixture.failure();

      expect.assertions(2);
      await expect(
        checkoutClient.postCheckoutSession(data),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
