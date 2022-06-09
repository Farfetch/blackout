import { postOrderDocument } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postOrderDocument.fixtures';
import mswServer from '../../../tests/mswServer';

const orderId = '24BJKS';
const fileId = '8e02707d-42c8-45d6-8407-b3727a6670cb';
const response = '';
const data = {
  action: 'SendToCustomer',
  documentTypes: ['ComercialInvoice'],
};
const expectedConfig = undefined;

beforeEach(() => jest.clearAllMocks());

describe('postOrderDocument', () => {
  const spy = jest.spyOn(client, 'post');

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(response));

    await expect(postOrderDocument(orderId, fileId, data)).resolves.toBe(
      response,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/documents/${fileId}`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      postOrderDocument(orderId, fileId, data),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/documents/${fileId}`,
      data,
      expectedConfig,
    );
  });
});
