import { getGuestOrderLegacy } from '..';
import { mockOrderDetailsResponse, orderId } from 'tests/__fixtures__/orders';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getGuestOrderLegacy.fixtures';
import mswServer from '../../../tests/mswServer';

const email = 'dummy@email.com';
const expectedConfig = undefined;

beforeEach(() => jest.clearAllMocks());

describe('getGuestOrderLegacy', () => {
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockOrderDetailsResponse));

    await expect(getGuestOrderLegacy(orderId, email)).resolves.toStrictEqual(
      mockOrderDetailsResponse,
    );
    expect(spy).toHaveBeenCalledWith(
      `/legacy/v1/guestorders/${orderId}?guestUserEmail=dummy%40email.com`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getGuestOrderLegacy(orderId, email)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/legacy/v1/guestorders/${orderId}?guestUserEmail=dummy%40email.com`,
      expectedConfig,
    );
  });
});
