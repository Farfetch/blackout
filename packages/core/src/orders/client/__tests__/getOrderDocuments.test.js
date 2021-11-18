import { getOrderDocuments } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getOrderDocuments.fixtures';
import moxios from 'moxios';

const orderId = '24BJKS';
const expectedConfig = undefined;
const types = ['ComercialInvoice'];
const response = [
  {
    id: '1',
    fileId: '98b1cb96-710e-437c-98b6-e904b91cf6f6',
    type: 'ComercialInvoice',
    createdAt: '2021-08-04T06:36:17.28+00:00',
    updatedAt: '2021-08-04T06:37:50.317+00:00',
  },
];

beforeEach(() => {
  moxios.install(client);
  jest.clearAllMocks();
});

afterEach(() => moxios.uninstall(client));

describe('getOrderDocuments', () => {
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    fixtures.success({ orderId, response, types });

    await expect(getOrderDocuments({ orderId, types })).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/documents?types=${types[0]}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ orderId, types });

    await expect(
      getOrderDocuments({ orderId, types }),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/documents?types=${types[0]}`,
      expectedConfig,
    );
  });
});
