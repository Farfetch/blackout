import { id, mockCharge } from 'tests/__fixtures__/payments/index.mjs';
import { type PaymentIntentCharge, postPaymentIntentCharge } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/postPaymentIntentCharge.fixtures.js';
import mswServer from '../../../tests/mswServer.js';
import type { AxiosResponse } from 'axios';

describe('postPaymentIntentCharge', () => {
  const data = {
    returnUrl: 'string',
    cancelUrl: 'string',
  };
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'post');
  const urlToBeCalled = `/payment/v1/intents/${id}/charges`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    // Force the cast here as it is not necessary for the test
    // to mock the AxiosResponse completely.
    const response = {
      data: mockCharge,
    } as unknown as AxiosResponse<PaymentIntentCharge>;

    mswServer.use(fixtures.success(response));

    await expect(postPaymentIntentCharge(id, data)).resolves.toMatchObject(
      response,
    );
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(postPaymentIntentCharge(id, data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });
});
