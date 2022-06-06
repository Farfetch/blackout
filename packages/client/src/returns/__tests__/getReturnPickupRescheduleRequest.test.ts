import { getReturnPickupRescheduleRequest } from '..';
import { responses } from 'tests/__fixtures__/returns';
import client from '../../helpers/client';
import fixture from '../__fixtures__/getReturnPickupRescheduleRequest.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('getReturnPickupRescheduleRequest', () => {
  const spy = jest.spyOn(client, 'get');
  const id = '123456';
  const rescheduleRequestId = '1654321';
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = responses.getReturnPickupRescheduleRequest.success;

    fixture.success(id, rescheduleRequestId, response);

    expect.assertions(2);
    await expect(
      getReturnPickupRescheduleRequest(id, rescheduleRequestId),
    ).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      join(
        `/account/v1/returns/${id}/pickupRescheduleRequests/${rescheduleRequestId}`,
      ),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixture.failure(id, rescheduleRequestId);

    expect.assertions(2);
    await expect(
      getReturnPickupRescheduleRequest(id, rescheduleRequestId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join(
        `/account/v1/returns/${id}/pickupRescheduleRequests/${rescheduleRequestId}`,
      ),
      expectedConfig,
    );
  });
});
