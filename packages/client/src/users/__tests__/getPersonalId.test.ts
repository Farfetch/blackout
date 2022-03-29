import { getPersonalId } from '..';
import { mockPersonalIdResponse } from 'tests/__fixtures__/users';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getPersonalId.fixtures';
import moxios from 'moxios';

describe('getPersonalId', () => {
  const expectedConfig = {
    'X-SUMMER-RequestId': 'test',
  };
  const id = 123456;
  const personalId = '123456';
  const config = {
    'X-SUMMER-RequestId': 'test',
  };
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockPersonalIdResponse;

    fixtures.success(id, personalId, response);

    expect.assertions(2);

    await expect(getPersonalId(id, personalId, config)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${id}/personalIds/${personalId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure(id, personalId);

    expect.assertions(2);

    await expect(
      getPersonalId(id, personalId, config),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${id}/personalIds/${personalId}`,
      expectedConfig,
    );
  });
});
