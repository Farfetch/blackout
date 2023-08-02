import { postApplePaySession } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/postApplePaySession.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('postApplePaySession', () => {
  const data = {
    validationUrl:
      'https://apple-pay-gateway-cert.apple.com/paymentservices/paymentSession',
  };
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const spy = jest.spyOn(client, 'post');
  const urlToBeCalled = '/payment/v1/applepaysession';

  it('should handle a client request successfully', async () => {
    const response = {
      merchantIdentifier: '',
      displayName: '',
      initiative: '',
      initiativeContext: '',
    };

    mswServer.use(fixtures.success(response));
    await expect(postApplePaySession(data)).resolves.toMatchObject(response);
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());
    await expect(postApplePaySession(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });
});
