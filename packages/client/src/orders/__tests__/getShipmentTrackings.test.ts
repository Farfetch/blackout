import { getShipmentTrackings } from '..';
import {
  mockTrackingResponse,
  trackingNumber,
} from 'tests/__fixtures__/orders';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getShipmentTrackings.fixtures';
import mswServer from '../../../tests/mswServer';

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
