import * as usersClient from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getTitles.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getTitles', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const expectedBaseUrl = '/account/v1/titles';
  const response = {
    number: 1,
    totalPages: 1,
    totalItems: 2,
    entries: [
      {
        id: '123',
        value: 'foo',
      },
      {
        id: '456',
        value: 'bar',
      },
    ],
  };

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(response));

    await expect(usersClient.getTitles()).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(expectedBaseUrl, expectedConfig);
  });

  it('should handle a client request successfully with pagination', async () => {
    const query = {
      page: 1,
      pageSize: 1,
    };
    const expectedUrl = `${expectedBaseUrl}?page=${query.page}&pageSize=${query.pageSize}`;

    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(usersClient.getTitles(query)).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(usersClient.getTitles()).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(expectedBaseUrl, expectedConfig);
  });
});
