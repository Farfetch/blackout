import { getTitles } from '..';
import { mockGetTitlesResponse } from 'tests/__fixtures__/users';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getTitles.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('getTitles', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const expectedBaseUrl = '/account/v1/titles';

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockGetTitlesResponse));

    await expect(getTitles()).resolves.toStrictEqual(mockGetTitlesResponse);
    expect(spy).toHaveBeenCalledWith(expectedBaseUrl, expectedConfig);
  });

  it('should handle a client request successfully with pagination', async () => {
    const query = {
      page: 1,
      pageSize: 1,
    };
    const expectedUrl = `${expectedBaseUrl}?page=${query.page}&pageSize=${query.pageSize}`;

    mswServer.use(fixtures.success(mockGetTitlesResponse));

    expect.assertions(2);

    await expect(getTitles(query)).resolves.toStrictEqual(
      mockGetTitlesResponse,
    );
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(getTitles()).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(expectedBaseUrl, expectedConfig);
  });
});
