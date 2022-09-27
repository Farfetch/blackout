import { getReturnPickupRescheduleRequests } from '..';
import { returnId as id, responses } from 'tests/__fixtures__/returns';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getReturnPickupRescheduleRequests.fixtures';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer';

describe('getReturnPickupRescheduleRequests', () => {
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = responses.getReturnPickupRescheduleRequests.success;

    mswServer.use(fixtures.success(response));

    expect.assertions(2);

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
