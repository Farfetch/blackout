import { getOrderDocument } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getOrderDocument.fixtures';
import moxios from 'moxios';

const orderId = '24BJKS';
const fileId = '8e02707d-42c8-45d6-8407-b3727a6670cb';
const expectedConfig = undefined;
const response = {};

beforeEach(() => {
  moxios.install(client);
  jest.clearAllMocks();
});

afterEach(() => moxios.uninstall(client));

describe('getOrderDocument', () => {
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    fixtures.success({ orderId, response, fileId });

    await expect(getOrderDocument({ orderId, fileId })).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/documents/${fileId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ orderId, fileId });

    await expect(
      getOrderDocument({ orderId, fileId }),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/documents/${fileId}`,
      expectedConfig,
    );
  });
});
