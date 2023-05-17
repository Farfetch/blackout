import { getGuestOrderLegacy } from '../index.js';
import {
  mockOrderDetailsResponse,
  orderId,
} from 'tests/__fixtures__/orders/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getGuestOrderLegacy.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

const data = {
  guestUserEmail: 'dummy@email.com',
};
const expectedConfig = undefined;

beforeEach(() => jest.clearAllMocks());

describe('getGuestOrderLegacy', () => {
  const spy = jest.spyOn(client, 'post');

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockOrderDetailsResponse));

    await expect(getGuestOrderLegacy(orderId, data)).resolves.toStrictEqual(
      mockOrderDetailsResponse,
    );
    expect(spy).toHaveBeenCalledWith(
      `/legacy/v1/guestorders/${orderId}`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getGuestOrderLegacy(orderId, data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/legacy/v1/guestorders/${orderId}`,
      data,
      expectedConfig,
    );
  });
});
