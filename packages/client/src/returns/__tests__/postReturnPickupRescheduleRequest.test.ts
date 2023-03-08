import {
  returnId as id,
  mockPickupReschedulePostData,
  responses,
} from 'tests/__fixtures__/returns/index.mjs';
import { postReturnPickupRescheduleRequest } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/postReturnPickupRescheduleRequest.fixtures.js';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer.js';

describe('postReturnPickupRescheduleRequests()', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = responses.postReturnPickupRescheduleRequests.success;

    mswServer.use(fixtures.success(response));

    await expect(
      postReturnPickupRescheduleRequest(id, mockPickupReschedulePostData),
    ).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}/pickupRescheduleRequests`),
      mockPickupReschedulePostData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      postReturnPickupRescheduleRequest(id, mockPickupReschedulePostData),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}/pickupRescheduleRequests`),
      mockPickupReschedulePostData,
      expectedConfig,
    );
  });
});
