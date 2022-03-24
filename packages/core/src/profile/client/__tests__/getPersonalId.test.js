import * as profileClient from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getPersonalId.fixtures';
import moxios from 'moxios';

describe('getPersonalId', () => {
  const expectedConfig = undefined;
  const id = 123456;
  const personalId = '123456';
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success(id, personalId, response);

    expect.assertions(2);

    await expect(profileClient.getPersonalId(id, personalId)).resolves.toBe(
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
      profileClient.getPersonalId(id, personalId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${id}/personalIds/${personalId}`,
      expectedConfig,
    );
  });
});
