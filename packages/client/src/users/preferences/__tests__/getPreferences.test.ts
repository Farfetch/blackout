import * as usersClient from '../..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getUserPreferences.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('getPreferences', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const mockUserId = 0;
  const mockCode = 'Test';
  const response = [
    {
      code: mockCode,
      values: ['136968', '136831', '136908'],
      groupId: 'mobile',
      updatedDate: '2019-08-19T10:46:59.543Z',
    },
  ];

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(
      usersClient.getUserPreferences(mockUserId),
    ).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${mockUserId}/preferences`,
      expectedConfig,
    );
  });

  it('should filter by code and handle a client request successfully', async () => {
    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(
      usersClient.getUserPreferences(mockUserId, mockCode),
    ).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${mockUserId}/preferences?code=${mockCode}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(
      usersClient.getUserPreferences(mockUserId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${mockUserId}/preferences`,
      expectedConfig,
    );
  });

  it('should receive a client request error when filtered by code', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(
      usersClient.getUserPreferences(mockUserId, mockCode),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${mockUserId}/preferences?code=${mockCode}`,
      expectedConfig,
    );
  });
});
