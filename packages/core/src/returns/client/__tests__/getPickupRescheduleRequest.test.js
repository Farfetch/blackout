import { getPickupRescheduleRequest } from '..';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/getPickupRescheduleRequest.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('getPickupRescheduleRequest', () => {
  const spy = jest.spyOn(client, 'get');
  const id = '123456';
  const pickupRescheduleId = '123456';
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixture.success(id, pickupRescheduleId, response);

    expect.assertions(2);

    await expect(
      getPickupRescheduleRequest(id, pickupRescheduleId),
    ).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      join(
        `/account/v1/returns/${id}/pickupRescheduleRequests/${pickupRescheduleId}`,
      ),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixture.failure(id, pickupRescheduleId);

    expect.assertions(2);

    await expect(
      getPickupRescheduleRequest(id, pickupRescheduleId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join(
        `/account/v1/returns/${id}/pickupRescheduleRequests/${pickupRescheduleId}`,
      ),
      expectedConfig,
    );
  });
});
