import { getPickupRescheduleRequests } from '..';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/getPickupRescheduleRequests.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('getPickupRescheduleRequests', () => {
  const spy = jest.spyOn(client, 'get');
  const id = '123456';
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = [
      {
        id: 'string',
        timeWindow: {
          start: '2022-05-05T10:43:30.653Z',
          end: '2022-05-05T10:43:30.653Z',
        },
        status: 'InProgress',
      },
    ];

    fixture.success(id, response);

    expect.assertions(2);

    await expect(getPickupRescheduleRequests(id)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}/pickupRescheduleRequests`),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixture.failure(id);

    expect.assertions(2);

    await expect(getPickupRescheduleRequests(id)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}/pickupRescheduleRequests`),
      expectedConfig,
    );
  });
});
