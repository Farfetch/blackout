import { getReturnPickupCapability } from '../index.js';
import { id, responses } from 'tests/__fixtures__/returns/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getReturnPickupCapability.fixtures.js';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer.js';

describe('getReturnPickupCapability', () => {
  const pickupDay = '2020-04-20';
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = responses.getReturnPickupCapability.success;

    mswServer.use(fixtures.success(response));

    await expect(
      getReturnPickupCapability(id, pickupDay),
    ).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}/pickupcapabilities/${pickupDay}`),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getReturnPickupCapability(id, pickupDay),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}/pickupcapabilities/${pickupDay}`),
      expectedConfig,
    );
  });
});
