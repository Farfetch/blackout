import { getUserCreditBalance } from '..';
import { mockCreditBalanceResponse } from 'tests/__fixtures__/payments';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getUserCreditBalance.fixtures';
import mswServer from '../../../tests/mswServer';
import type { Balance } from '../types';

describe('getUserCreditBalance', () => {
  const expectedConfig = undefined;
  const data = { creditUserId: 'string' };
  const spy = jest.spyOn(client, 'post');
  const urlToBeCalled = '/payment/v1/checkCreditBalance';

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response: Balance = mockCreditBalanceResponse;

    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(getUserCreditBalance(data)).resolves.toStrictEqual(response);

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(getUserCreditBalance(data)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });
});
