import * as profileClient from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/deletePersonalId.fixtures';
import moxios from 'moxios';

describe('deletePersonalId', () => {
  const expectedConfig = undefined;
  const id = 123456;
  const personalId = '123456';
  const spy = jest.spyOn(client, 'delete');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = 200;

    fixtures.success(id, personalId, response);

    expect.assertions(2);

    await expect(profileClient.deletePersonalId(id, personalId)).resolves.toBe(
      response,
    );

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${id}/personalIds/${personalId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure(id, personalId);

    expect.assertions(2);

    await expect(
      profileClient.deletePersonalId(id, personalId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${id}/personalIds/${personalId}`,
      expectedConfig,
    );
  });
});
