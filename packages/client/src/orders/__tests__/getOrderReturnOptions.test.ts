import { getOrderReturnOptions } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getOrderReturnOptions.fixtures';
import moxios from 'moxios';

const id = '123456';
const expectedConfig = undefined;

beforeEach(() => {
  moxios.install(client);
  jest.clearAllMocks();
});

afterEach(() => moxios.uninstall(client));

describe('getOrderReturnOptions', () => {
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({ id, response });

    await expect(getOrderReturnOptions(id)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/legacy/v1/orders/${id}/returnoptions`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ id });

    await expect(getOrderReturnOptions(id)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/legacy/v1/orders/${id}/returnoptions`,
      expectedConfig,
    );
  });
});
