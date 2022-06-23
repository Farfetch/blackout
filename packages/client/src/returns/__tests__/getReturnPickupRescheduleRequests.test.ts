import { getReturnPickupRescheduleRequests } from '..';
import { responses } from 'tests/__fixtures__/returns';
import client from '../../helpers/client';
import fixture from '../__fixtures__/getReturnPickupRescheduleRequests.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('getReturnPickupRescheduleRequests', () => {
  const spy = jest.spyOn(client, 'get');
  const id = '123456';
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = responses.getReturnPickupRescheduleRequests.success;

    fixture.success({ id, response });

    expect.assertions(2);

    await expect(getReturnPickupRescheduleRequests(id)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}/pickupRescheduleRequests`),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixture.failure({ id });

    expect.assertions(2);

    await expect(
      getReturnPickupRescheduleRequests(id),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}/pickupRescheduleRequests`),
      expectedConfig,
    );
  });
});
