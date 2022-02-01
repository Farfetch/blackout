import { getTrackings } from '..';
import { mockTrackingResponse } from 'tests/__fixtures__/orders';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getTrackings.fixtures';
import moxios from 'moxios';

const trackingCodes = '1';
const expectedConfig = undefined;

beforeEach(() => {
  moxios.install(client);
  jest.clearAllMocks();
});

afterEach(() => moxios.uninstall(client));

describe('getTrackings', () => {
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    const response = mockTrackingResponse;

    fixtures.success({ trackingCodes, response });

    await expect(getTrackings(trackingCodes)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/trackings?trackingNumbers=${trackingCodes}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ trackingCodes });

    await expect(getTrackings(trackingCodes)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/trackings?trackingNumbers=${trackingCodes}`,
      expectedConfig,
    );
  });
});
