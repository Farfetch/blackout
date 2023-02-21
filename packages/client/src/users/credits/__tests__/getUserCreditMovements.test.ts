import { getUserCreditMovements } from '..';
import {
  mockGetCreditMovementsResponse,
  userId,
} from 'tests/__fixtures__/users';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getUserCreditMovements.fixtures';
import join from 'proper-url-join';
import mswServer from '../../../../tests/mswServer';

describe('getUserCreditMovements', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const query = { to: '2017-07-01T00:00:00' };

    mswServer.use(fixtures.success(mockGetCreditMovementsResponse));

    await expect(getUserCreditMovements(userId, query)).resolves.toStrictEqual(
      mockGetCreditMovementsResponse,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/creditMovements?to=2017-07-01T00%3A00%3A00`,
      expectedConfig,
    );
  });

  it('should handle a client request successfully with pagination', async () => {
    const query = {
      page: 1,
      pageSize: 1,
    };
    const expectedUrl = `/account/v1/users/${userId}/creditMovements?page=${query.page}&pageSize=${query.pageSize}`;

    mswServer.use(fixtures.success(mockGetCreditMovementsResponse));

    await expect(getUserCreditMovements(userId, query)).resolves.toStrictEqual(
      mockGetCreditMovementsResponse,
    );
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  it('should handle a client request successfully with date range', async () => {
    const query = {
      from: new Date('2020-01-20').toISOString(),
      to: new Date('2020-02-10').toISOString(),
    };
    const expectedUrl = join(`/account/v1/users/${userId}/creditMovements`, {
      query,
    });

    mswServer.use(fixtures.success(mockGetCreditMovementsResponse));

    await expect(getUserCreditMovements(userId, query)).resolves.toStrictEqual(
      mockGetCreditMovementsResponse,
    );
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    const query = {};

    mswServer.use(fixtures.failure());

    await expect(
      getUserCreditMovements(userId, query),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/creditMovements`,
      expectedConfig,
    );
  });
});
