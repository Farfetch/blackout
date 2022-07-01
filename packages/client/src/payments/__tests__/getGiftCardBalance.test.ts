import { getGiftCardBalance } from '..';
import { mockCreditBalanceResponse } from 'tests/__fixtures__/payments';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getGiftCardBalance.fixtures';
import mswServer from '../../../tests/mswServer';
import type { Balance } from '../types';

describe('getGiftCardBalance', () => {
  const expectedConfig = undefined;
  const data = { giftCardNumber: 'string', giftCardCsc: 'string' };
  const spy = jest.spyOn(client, 'post');
  const urlToBeCalled = '/payment/v1/checkGiftCardBalance';

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response: Balance = mockCreditBalanceResponse;

    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(getGiftCardBalance(data)).resolves.toStrictEqual(response);

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(getGiftCardBalance(data)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });
});
