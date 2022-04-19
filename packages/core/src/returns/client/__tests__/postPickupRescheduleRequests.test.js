import { postPickupRescheduleRequests } from '..';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/postPickupRescheduleRequests.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('postPickupRescheduleRequests()', () => {
  const data = {
    id: 'string',
    timeWindow: {
      start: '2022-05-05T10:49:54.051Z',
      end: '2022-05-05T10:49:54.051Z',
    },
    status: 'InProgress',
  };
  const id = '123456';
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = 202;

    fixture.success(id, response);

    expect.assertions(2);

    await expect(postPickupRescheduleRequests(id, data)).resolves.toBe(
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
      postPickupRescheduleRequests(id, data),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}/pickupRescheduleRequests`),
      data,
      expectedConfig,
    );
  });
});
