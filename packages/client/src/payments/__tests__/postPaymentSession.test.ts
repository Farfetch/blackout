import { mockPaymentSession } from 'tests/__fixtures__/payments/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/postPaymentSession.fixtures.js';
import mswServer from '../../../tests/mswServer.js';
import postPaymentSession from '../postPaymentSession.js';
import type { PostPaymentSessionData } from '../index.js';

describe('postPaymentSession', () => {
  const expectedConfig = undefined;

  const data: PostPaymentSessionData = {
    paymentIntentId: '25cfbb10-f4d1-4684-8e52-45e4d3b001d3',
  };

  const spy = jest.spyOn(client, 'post');
  const urlToBeCalled = '/payment/v1/paymentsession';

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockPaymentSession));

    await expect(postPaymentSession(data)).resolves.toMatchObject(
      mockPaymentSession,
    );

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(postPaymentSession(data)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });
});
