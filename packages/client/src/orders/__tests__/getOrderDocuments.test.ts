import { getOrderDocuments } from '..';
import { mockOrderDocumentsResponse } from 'tests/__fixtures__/orders';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getOrderDocuments.fixtures';
import moxios from 'moxios';

const orderId = '24BJKS';
const expectedConfig = undefined;
const types = ['ComercialInvoice'];
const response = mockOrderDocumentsResponse;

beforeEach(() => {
  moxios.install(client);
  jest.clearAllMocks();
});

afterEach(() => moxios.uninstall(client));

describe('getOrderDocuments', () => {
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    fixtures.success({ orderId, types, response });

    await expect(getOrderDocuments(orderId, types)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/documents?types=${types[0]}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ orderId, types });

    await expect(getOrderDocuments(orderId, types)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/documents?types=${types[0]}`,
      expectedConfig,
    );
  });
});
