import { getReturnPickupRescheduleRequest } from '..';
import {
  returnId as id,
  rescheduleRequestId,
  responses,
} from 'tests/__fixtures__/returns';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getReturnPickupRescheduleRequest.fixtures';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer';

describe('getReturnPickupRescheduleRequest', () => {
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = responses.getReturnPickupRescheduleRequest.success;

    mswServer.use(fixtures.success(response));

    expect.assertions(2);
    await expect(
      getReturnPickupRescheduleRequest(id, rescheduleRequestId),
    ).resolves.toStrictEqual(response);

    expect(spy).toHaveBeenCalledWith(
      join(
        `/account/v1/returns/${id}/pickupRescheduleRequests/${rescheduleRequestId}`,
      ),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

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
