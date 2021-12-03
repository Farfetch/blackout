import * as usersClient from '../';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getTitles.fixtures';
import moxios from 'moxios';

describe('getTitles', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const expectedBaseUrl = '/account/v1/titles';

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};
    const query = {};

    fixtures.success({ response });

    await expect(usersClient.getTitles(query)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(expectedBaseUrl, expectedConfig);
  });

  it('should handle a client request successfully with pagination', async () => {
    const response = {};
    const query = {
      page: 1,
      pageSize: 1,
    };
    const expectedUrl = `${expectedBaseUrl}?page=${query.page}&pageSize=${query.pageSize}`;
    fixtures.success({ query, response });

    expect.assertions(2);

    await expect(usersClient.getTitles(query)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    const query = {};
    fixtures.failure();

    expect.assertions(2);

    await expect(usersClient.getTitles(query)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(expectedBaseUrl, expectedConfig);
  });
});
