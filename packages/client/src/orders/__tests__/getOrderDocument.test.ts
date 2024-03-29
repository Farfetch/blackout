import { fileId, orderId } from 'tests/__fixtures__/orders/index.mjs';
import { getOrderDocument } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getOrderDocument.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

const expectedConfig = undefined;
const response = '';

beforeEach(() => jest.clearAllMocks());

describe('getOrderDocument', () => {
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(response));

    await expect(getOrderDocument(orderId, fileId)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/documents/${fileId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getOrderDocument(orderId, fileId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/documents/${fileId}`,
      expectedConfig,
    );
  });
});
