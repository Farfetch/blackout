import { getOrderReturns } from '..';
import { mockOrderId, responses } from 'tests/__fixtures__/returns';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getOrderReturns.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getOrderReturns', () => {
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;
  const response = responses.get.success;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(response));

    expect.assertions(2);
    await expect(getOrderReturns(mockOrderId)).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${mockOrderId}/returns`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);
    await expect(getOrderReturns(mockOrderId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${mockOrderId}/returns`,
      expectedConfig,
    );
  });
});
