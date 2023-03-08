import {
  fileId,
  mockOrderDocumentPayload,
  orderId,
} from 'tests/__fixtures__/orders/index.mjs';
import { postOrderDocument } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/postOrderDocument.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

const response = '';
const expectedConfig = undefined;

beforeEach(() => jest.clearAllMocks());

describe('postOrderDocument', () => {
  const spy = jest.spyOn(client, 'post');

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(response));

    await expect(
      postOrderDocument(orderId, fileId, mockOrderDocumentPayload),
    ).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/documents/${fileId}`,
      mockOrderDocumentPayload,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      postOrderDocument(orderId, fileId, mockOrderDocumentPayload),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/documents/${fileId}`,
      mockOrderDocumentPayload,
      expectedConfig,
    );
  });
});
