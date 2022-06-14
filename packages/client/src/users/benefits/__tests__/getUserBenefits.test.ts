import * as usersClient from '../..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getUserBenefits.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('getUserBenefits', () => {
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

    expect.assertions(2);

    await expect(usersClient.getUserBenefits()).resolves.toStrictEqual(
      response,
    );
    expect(spy).toHaveBeenCalledWith('/legacy/v1/userbenefits', expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(usersClient.getUserBenefits()).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith('/legacy/v1/userbenefits', expectedConfig);
  });
});
