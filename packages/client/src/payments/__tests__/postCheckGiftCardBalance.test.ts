import { Balance } from '../types';
import { postCheckGiftCardBalance } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postGiftCardBalance.fixtures';
import moxios from 'moxios';

describe('postGiftCardBalance', () => {
  const expectedConfig = undefined;
  const data = { giftCardNumber: 'string', giftCardCsc: 'string' };
  const spy = jest.spyOn(client, 'post');
  const urlToBeCalled = '/payment/v1/checkGiftCardBalance';

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response: Balance = {
      currency: 'string',
      value: 0,
    };

    fixtures.success({ response });

    expect.assertions(2);

    await expect(postCheckGiftCardBalance(data)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure();

    expect.assertions(2);

    await expect(postCheckGiftCardBalance(data)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });
});
