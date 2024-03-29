import { getGiftCardBalance } from '../index.js';
import { mockCreditBalanceResponse } from 'tests/__fixtures__/payments/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getGiftCardBalance.fixtures.js';
import mswServer from '../../../tests/mswServer.js';
import type { Balance } from '../types/index.js';

describe('getGiftCardBalance', () => {
  const expectedConfig = undefined;
  const data = { giftCardNumber: 'string', giftCardCsc: 'string' };
  const spy = jest.spyOn(client, 'post');
  const urlToBeCalled = '/payment/v1/checkGiftCardBalance';

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response: Balance = mockCreditBalanceResponse;

    mswServer.use(fixtures.success(response));

    await expect(getGiftCardBalance(data)).resolves.toStrictEqual(response);

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getGiftCardBalance(data)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });
});
