import { getOrder } from '../index.js';
import {
  mockOrderDetailsResponse,
  orderId,
} from 'tests/__fixtures__/orders/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getOrder.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

const expectedConfig = undefined;

beforeEach(() => jest.clearAllMocks());

describe('getOrder', () => {
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockOrderDetailsResponse));

    await expect(getOrder(orderId)).resolves.toStrictEqual(
      mockOrderDetailsResponse,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getOrder(orderId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}`,
      expectedConfig,
    );
  });
});
