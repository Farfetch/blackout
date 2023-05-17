import * as usersClient from '../../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/getUserBenefits.fixtures.js';
import join from 'proper-url-join';
import mswServer from '../../../../tests/mswServer.js';

describe('getUserBenefits', () => {
  const userId = 10000;
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = {
      id: '00000000-0000-0000-0000-000000000000',
      code: 'SummerParty2017',
      isActive: true,
      metadata: { 'dress-code': 'green' },
      benefitType: 'price',
    };

    mswServer.use(fixtures.success(response));

    await expect(usersClient.getUserBenefits(userId)).resolves.toStrictEqual(
      response,
    );
    expect(spy).toHaveBeenCalledWith(
      join('/account/v1/users', userId, 'benefits'),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(usersClient.getUserBenefits(userId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      join('/account/v1/users', userId, 'benefits'),
      expectedConfig,
    );
  });
});
