import { getPickupCapabilities } from '..';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/getPickupCapabilities.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('getPickupCapabilities', () => {
  const spy = jest.spyOn(client, 'get');
  const id = 123456;
  const pickupDay = '2020-04-20';
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixture.success({
      id,
      pickupDay,
      response,
    });

    expect.assertions(2);
    await expect(getPickupCapabilities(id, pickupDay)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}/pickupcapabilities/${pickupDay}`),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixture.failure({ id, pickupDay });

    expect.assertions(2);
    await expect(
      getPickupCapabilities(id, pickupDay),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}/pickupcapabilities/${pickupDay}`),
      expectedConfig,
    );
  });
});
