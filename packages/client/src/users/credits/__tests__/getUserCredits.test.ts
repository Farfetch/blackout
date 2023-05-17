import { getUserCredits } from '../index.js';
import {
  mockGetCreditResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/getUserCredits.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('getUserCredits', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockGetCreditResponse));

    await expect(getUserCredits(userId)).resolves.toStrictEqual(
      mockGetCreditResponse,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/credits`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getUserCredits(userId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/credits`,
      expectedConfig,
    );
  });
});
