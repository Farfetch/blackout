import { getTrackings } from '..';
import { mockTrackingResponse } from 'tests/__fixtures__/orders';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getTrackings.fixtures';
import mswServer from '../../../tests/mswServer';

const trackingCodes = '1';
const expectedConfig = undefined;

beforeEach(() => jest.clearAllMocks());

describe('getTrackings', () => {
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    const response = mockTrackingResponse;
    mswServer.use(fixtures.success(response));

    await expect(getTrackings(trackingCodes)).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/trackings?trackingNumbers=${trackingCodes}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getTrackings(trackingCodes)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/trackings?trackingNumbers=${trackingCodes}`,
      expectedConfig,
    );
  });
});
