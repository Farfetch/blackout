import { getPaymentMethodsByCountryAndCurrency } from '..';
import { mockFetchPaymentMethodsResponse } from 'tests/__fixtures__/payments';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getPaymentMethodsByCountryAndCurrency.fixtures';
import mswServer from '../../../tests/mswServer';
import type { PaymentMethods } from '../types';

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
