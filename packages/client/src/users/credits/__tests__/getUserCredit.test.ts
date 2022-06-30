import { getUserCredit } from '..';
import { userId, mockGetCreditResponse } from 'tests/__fixtures__/users';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getUserCredit.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('getUserCredit', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockGetCreditResponse));

    expect.assertions(2);

    await expect(getUserCredit(userId)).resolves.toStrictEqual(
      mockGetCreditResponse,
    );
    expect(spy).toHaveBeenCalledWith(
      `/legacy/v1/users/${userId}/credits`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(getUserCredit(userId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/legacy/v1/users/${userId}/credits`,
      expectedConfig,
    );
  });
});
