import { getOrderDetails } from '..';
import { mockOrderDetailsResponse } from 'tests/__fixtures__/orders';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getOrderDetails.fixtures';
import mswServer from '../../../tests/mswServer';

const id = '24BJKS';
const expectedConfig = undefined;

beforeEach(() => jest.clearAllMocks());

describe('getOrderDetails', () => {
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockOrderDetailsResponse));

    await expect(getOrderDetails(id)).resolves.toStrictEqual(
      mockOrderDetailsResponse,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${id}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getOrderDetails(id)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${id}`,
      expectedConfig,
    );
  });
});
