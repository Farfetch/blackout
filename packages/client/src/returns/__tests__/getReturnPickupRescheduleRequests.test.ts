import { getReturnPickupRescheduleRequests } from '../index.js';
import {
  returnId as id,
  responses,
} from 'tests/__fixtures__/returns/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getReturnPickupRescheduleRequests.fixtures.js';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer.js';

describe('getReturnPickupRescheduleRequests', () => {
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = responses.getReturnPickupRescheduleRequests.success;

    mswServer.use(fixtures.success(response));

    await expect(getReturnPickupRescheduleRequests(id)).resolves.toStrictEqual(
      response,
    );

    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}/pickupRescheduleRequests`),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getReturnPickupRescheduleRequests(id),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}/pickupRescheduleRequests`),
      expectedConfig,
    );
  });
});
