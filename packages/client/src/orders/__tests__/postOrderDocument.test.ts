import { postOrderDocument } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postOrderDocument.fixtures';
import moxios from 'moxios';

const orderId = '24BJKS';
const fileId = '8e02707d-42c8-45d6-8407-b3727a6670cb';
const response = '';
const data = {
  action: 'SendToCustomer',
  documentTypes: ['ComercialInvoice'],
};
const expectedConfig = undefined;

beforeEach(() => {
  moxios.install(client);
  jest.clearAllMocks();
});

afterEach(() => moxios.uninstall(client));

describe('postOrderDocument', () => {
  const spy = jest.spyOn(client, 'post');

  it('should handle a client request successfully', async () => {
    fixtures.success({ orderId, fileId, response });

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
    fixtures.failure({ orderId, fileId });

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
