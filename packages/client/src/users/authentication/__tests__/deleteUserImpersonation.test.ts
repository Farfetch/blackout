import { deleteUserImpersonation } from '..';
import { id } from 'tests/__fixtures__/authentication';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/deleteUserImpersonation.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('deleteUserImpersonation', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    expect.assertions(2);

    await expect(deleteUserImpersonation(id)).resolves.toBe(204);

    expect(spy).toHaveBeenCalledWith(
      `/authentication/v1/userImpersonations/${id}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(deleteUserImpersonation(id)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/authentication/v1/userImpersonations/${id}`,
      expectedConfig,
    );
  });
});
