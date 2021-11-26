import { deleteUserImpersonation } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/deleteUserImpersonation.fixtures';
import moxios from 'moxios';

describe('deleteUserImpersonation', () => {
  const id = '1';
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    fixtures.success({ id });

    expect.assertions(2);

    await expect(deleteUserImpersonation(id)).resolves.toBe(204);

    expect(spy).toHaveBeenCalledWith(
      `/authentication/v1/userImpersonations/${id}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ id });

    expect.assertions(2);

    await expect(deleteUserImpersonation(id)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/authentication/v1/userImpersonations/${id}`,
      expectedConfig,
    );
  });
});
