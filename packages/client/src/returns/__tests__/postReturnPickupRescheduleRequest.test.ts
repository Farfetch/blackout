import {
  mockPickupReschedulePostData,
  responses,
} from 'tests/__fixtures__/returns';
import { postReturnPickupRescheduleRequest } from '..';
import client from '../../helpers/client';
import fixture from '../__fixtures__/postReturnPickupRescheduleRequest.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('postReturnPickupRescheduleRequests()', () => {
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
    const response = responses.postReturnPickupRescheduleRequests.success;

    fixture.success(id, response);

    expect.assertions(2);

    await expect(postReturnPickupRescheduleRequest(id, data)).resolves.toBe(
      response,
    );

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
      postReturnPickupRescheduleRequest(id, data),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}/pickupRescheduleRequests`),
      data,
      expectedConfig,
    );
  });
});
