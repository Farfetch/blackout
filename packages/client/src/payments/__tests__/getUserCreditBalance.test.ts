import { getUserCreditBalance } from '../index.js';
import { mockCreditBalanceResponse } from 'tests/__fixtures__/payments/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getUserCreditBalance.fixtures.js';
import mswServer from '../../../tests/mswServer.js';
import type { Balance } from '../types/index.js';

describe('getUserCreditBalance', () => {
  const expectedConfig = undefined;
  const data = { creditUserId: 'string' };
  const spy = jest.spyOn(client, 'post');
  const urlToBeCalled = '/payment/v1/checkCreditBalance';

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response: Balance = mockCreditBalanceResponse;

    mswServer.use(fixtures.success(response));

    await expect(getUserCreditBalance(data)).resolves.toStrictEqual(response);

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getUserCreditBalance(data)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });
});
