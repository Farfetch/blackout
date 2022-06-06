import { getReturnPickupCapabilities } from '..';
import { responses } from 'tests/__fixtures__/returns';
import client from '../../helpers/client';
import fixture from '../__fixtures__/getReturnPickupCapabilities.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('getReturnPickupCapabilities', () => {
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
    const response = responses.getReturnPickupCapabilities.success;

    fixture.success({
      id,
      pickupDay,
      response,
    });

    expect.assertions(2);
    await expect(getReturnPickupCapabilities(id, pickupDay)).resolves.toBe(
      response,
    );
    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}/pickupcapabilities/${pickupDay}`),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixture.failure({ id, pickupDay });

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
