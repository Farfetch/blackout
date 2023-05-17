import { getPaymentMethodsByCountryAndCurrency } from '../index.js';
import { mockFetchPaymentMethodsResponse } from 'tests/__fixtures__/payments/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getPaymentMethodsByCountryAndCurrency.fixtures.js';
import mswServer from '../../../tests/mswServer.js';
import type { PaymentMethods } from '../types/index.js';

describe('getPaymentMethodsByCountryAndCurrency', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const urlToBeCalled = '/payment/v1/paymentmethods';

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response: PaymentMethods[] = [
      mockFetchPaymentMethodsResponse,
      mockFetchPaymentMethodsResponse,
    ];

    mswServer.use(fixtures.success(response));

    await expect(
      getPaymentMethodsByCountryAndCurrency(),
    ).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getPaymentMethodsByCountryAndCurrency(),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
