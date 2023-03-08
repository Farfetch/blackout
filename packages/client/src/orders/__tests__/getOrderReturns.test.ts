import { getOrderReturns } from '../index.js';
import { mockOrderId, responses } from 'tests/__fixtures__/returns/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getOrderReturns.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getOrderReturns', () => {
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;
  const response = responses.get.success;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(response));

    await expect(getOrderReturns(mockOrderId)).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${mockOrderId}/returns`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getOrderReturns(mockOrderId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${mockOrderId}/returns`,
      expectedConfig,
    );
  });
});
