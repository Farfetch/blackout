import { getShipmentTrackings } from '../index.js';
import {
  mockTrackingResponse,
  trackingNumber,
} from 'tests/__fixtures__/orders/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getShipmentTrackings.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

const expectedConfig = undefined;

beforeEach(() => jest.clearAllMocks());

describe('getShipmentTrackings', () => {
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockTrackingResponse));

    await expect(getShipmentTrackings(trackingNumber)).resolves.toStrictEqual(
      mockTrackingResponse,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/trackings?trackingNumbers=${trackingNumber}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getShipmentTrackings(trackingNumber),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/trackings?trackingNumbers=${trackingNumber}`,
      expectedConfig,
    );
  });
});
