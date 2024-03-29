import { getOrderDocuments, OrderDocumentType } from '../index.js';
import {
  mockOrderDocumentsResponse,
  orderId,
} from 'tests/__fixtures__/orders/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getOrderDocuments.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

const expectedConfig = undefined;
const types = [OrderDocumentType.ComercialInvoice];
const response = mockOrderDocumentsResponse;

beforeEach(() => jest.clearAllMocks());

describe('getOrderDocuments', () => {
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockOrderDocumentsResponse));

    await expect(getOrderDocuments(orderId, types)).resolves.toStrictEqual(
      response,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/documents?types=${types[0]}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getOrderDocuments(orderId, types)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/documents?types=${types[0]}`,
      expectedConfig,
    );
  });
});
