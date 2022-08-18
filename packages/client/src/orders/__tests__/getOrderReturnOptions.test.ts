import { getOrderReturnOptions } from '..';
import { orderId } from 'tests/__fixtures__/orders';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getOrderReturnOptions.fixtures';
import mswServer from '../../../tests/mswServer';

const expectedConfig = undefined;

beforeEach(() => jest.clearAllMocks());

describe('getOrderReturnOptions', () => {
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    const response = {};

    mswServer.use(fixtures.success(response));

    await expect(getOrderReturnOptions(orderId)).resolves.toStrictEqual(
      response,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/returnoptions`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getOrderReturnOptions(orderId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/returnoptions`,
      expectedConfig,
    );
  });
});
