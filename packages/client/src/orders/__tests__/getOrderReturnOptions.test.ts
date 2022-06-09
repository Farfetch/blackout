import { getOrderReturnOptions } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getOrderReturnOptions.fixtures';
import mswServer from '../../../tests/mswServer';

const id = '123456';
const expectedConfig = undefined;

beforeEach(() => jest.clearAllMocks());

describe('getOrderReturnOptions', () => {
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    const response = {};

    mswServer.use(fixtures.success(response));

    await expect(getOrderReturnOptions(id)).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      `/legacy/v1/orders/${id}/returnoptions`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getOrderReturnOptions(id)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/legacy/v1/orders/${id}/returnoptions`,
      expectedConfig,
    );
  });
});
