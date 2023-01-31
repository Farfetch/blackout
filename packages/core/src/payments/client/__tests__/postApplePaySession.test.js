import { postApplePaySession } from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postApplePaySession.fixtures.js';
import moxios from 'moxios';

describe('post ApplePaySession', () => {
  const data = {
    validationUrl:
      'https://apple-pay-gateway-cert.apple.com/paymentservices/paymentSession',
  };
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('postApplePaySession', () => {
    const spy = jest.spyOn(client, 'post');
    const urlToBeCalled = '/payment/v1/applepaysession';

    it('should handle a client request successfully', async () => {
      const response = {};
      fixtures.success({ response });
      expect.assertions(2);
      await expect(postApplePaySession(data)).resolves.toMatchObject(response);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixtures.failure();
      expect.assertions(2);
      await expect(postApplePaySession(data)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
