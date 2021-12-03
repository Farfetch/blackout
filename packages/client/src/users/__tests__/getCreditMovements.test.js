import * as usersClient from '../';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getCreditMovements.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('getCreditMovements', () => {
  const expectedConfig = undefined;
  const id = '123456';
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};
    const query = {};

    fixtures.success({ id, query, response });

    expect.assertions(2);

    await expect(usersClient.getCreditMovements(id, query)).resolves.toBe(
      response,
    );
    expect(spy).toHaveBeenCalledWith(
      `/legacy/v1/users/${id}/creditMovements`,
      expectedConfig,
    );
  });

  it('should handle a client request successfully with pagination', async () => {
    const response = {};
    const query = {
      page: 1,
      pageSize: 1,
    };
    const expectedUrl = `/legacy/v1/users/${id}/creditMovements?page=${query.page}&pageSize=${query.pageSize}`;
    fixtures.success({ id, query, response });

    expect.assertions(2);

    await expect(usersClient.getCreditMovements(id, query)).resolves.toBe(
      response,
    );
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  it('should handle a client request successfully with date range', async () => {
    const response = {
      entries: [
        {
          type: 1,
          value: 0.57,
          formattedValue: '$0.57',
          currency: 'USD',
          description: 'Other Reason (FF fault)',
          createdOn: '/Date(1581071861195)/',
        },
        {
          type: 1,
          value: 13.97,
          formattedValue: '$13.97',
          currency: 'USD',
          description: 'Other Reason (FF fault)',
          createdOn: '/Date(1579793016416)/',
        },
        {
          type: 2,
          value: 13.97,
          formattedValue: '$13.97',
          currency: 'USD',
          description: 'EUR 12.56 credit was Used - Order W95FWA',
          createdOn: '/Date(1579792756504)/',
        },
      ],
      number: 1,
      totalItems: 3,
      totalPages: 1,
    };
    const query = {
      from: new Date('2020-01-20').toISOString(),
      to: new Date('2020-02-10').toISOString(),
    };
    const expectedUrl = join(`/legacy/v1/users/${id}/creditMovements`, {
      query,
    });

    fixtures.success({ id, query, response });

    expect.assertions(2);

    await expect(usersClient.getCreditMovements(id, query)).resolves.toBe(
      response,
    );
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    const query = {};
    fixtures.failure({ id, query });

    expect.assertions(2);

    await expect(
      usersClient.getCreditMovements(id, query),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/legacy/v1/users/${id}/creditMovements`,
      expectedConfig,
    );
  });
});
