import { getCheckoutOrderPaymentMethods } from '../../index.js';
import {
  orderId as id,
  mockFetchPaymentMethodsResponse,
} from 'tests/__fixtures__/payments/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getCheckoutOrderPaymentMethods.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getCheckoutOrderPaymentMethods', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const urlToBeCalled = `/checkout/v1/orders/${id}?fields=paymentMethods`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockFetchPaymentMethodsResponse));

    await expect(getCheckoutOrderPaymentMethods(id)).resolves.toStrictEqual(
      mockFetchPaymentMethodsResponse,
    );
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getCheckoutOrderPaymentMethods(id)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
