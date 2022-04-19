import {
  mockPickupReschedulePostData,
  responses,
} from 'tests/__fixtures__/returns';
import { postPickupRescheduleRequest } from '..';
import client from '../../helpers/client';
import fixture from '../__fixtures__/postPickupRescheduleRequest.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('postPickupRescheduleRequests()', () => {
  const data = mockPickupReschedulePostData;
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;
  const id = '123456';

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = responses.postPickupRescheduleRequests.success;

    fixture.success(id, response);

    expect.assertions(2);

    await expect(postPickupRescheduleRequest(id, data)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}/pickupRescheduleRequests`),
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixture.failure(id);

    expect.assertions(2);

    await expect(
      postPickupRescheduleRequest(id, data),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}/pickupRescheduleRequests`),
      data,
      expectedConfig,
    );
  });
});
