import { getPaymentMethods } from '..';
import {
  orderId as id,
  mockFetchPaymentMethodsResponse,
} from 'tests/__fixtures__/payments';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getPaymentMethods.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getPaymentMethods', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const urlToBeCalled = `/checkout/v1/orders/${id}?fields=paymentMethods`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockFetchPaymentMethodsResponse));

    expect.assertions(2);

    await expect(getPaymentMethods(id)).resolves.toStrictEqual(
      mockFetchPaymentMethodsResponse,
    );
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(getPaymentMethods(id)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
