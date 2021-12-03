import * as usersClient from '../';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getPreferences.fixtures';
import moxios from 'moxios';

describe('getPreferences', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const mockUserId = 0;
  const mockCode = 'Test';

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({ response, userId: mockUserId });

    expect.assertions(2);

    await expect(usersClient.getPreferences(mockUserId)).resolves.toBe(
      response,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${mockUserId}/preferences`,
      expectedConfig,
    );
  });

  it('should filter by code and handle a client request successfully', async () => {
    const response = {};

    fixtures.success({ response, userId: mockUserId, code: mockCode });

    expect.assertions(2);

    await expect(
      usersClient.getPreferences(mockUserId, mockCode),
    ).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${mockUserId}/preferences?code=${mockCode}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ userId: mockUserId });

    expect.assertions(2);

    await expect(
      usersClient.getPreferences(mockUserId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${mockUserId}/preferences`,
      expectedConfig,
    );
  });

  it('should receive a client request error when filtered by code', async () => {
    fixtures.failure({ userId: mockUserId, code: mockCode });

    expect.assertions(2);

    await expect(
      usersClient.getPreferences(mockUserId, mockCode),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${mockUserId}/preferences?code=${mockCode}`,
      expectedConfig,
    );
  });
});
