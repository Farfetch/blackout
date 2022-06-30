import { getReturnPickupCapabilities } from '..';
import { id, responses } from 'tests/__fixtures__/returns';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getReturnPickupCapabilities.fixtures';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer';

describe('getReturnPickupCapabilities', () => {
  const pickupDay = '2020-04-20';
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = responses.getReturnPickupCapabilities.success;

    mswServer.use(fixtures.success(response));

    expect.assertions(2);
    await expect(
      getReturnPickupCapabilities(id, pickupDay),
    ).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}/pickupcapabilities/${pickupDay}`),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);
    await expect(
      getReturnPickupCapabilities(id, pickupDay),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}/pickupcapabilities/${pickupDay}`),
      expectedConfig,
    );
  });
});
