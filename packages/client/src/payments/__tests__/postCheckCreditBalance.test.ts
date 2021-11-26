import { Balance } from '../types';
import { postCheckCreditBalance } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postCreditBalance.fixtures';
import moxios from 'moxios';

describe('postCheckCreditBalance', () => {
  const expectedConfig = undefined;
  const data = { creditUserId: 'string' };
  const spy = jest.spyOn(client, 'post');
  const urlToBeCalled = '/payment/v1/checkCreditBalance';

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

    await expect(postCheckCreditBalance(data)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure();

    expect.assertions(2);

    await expect(postCheckCreditBalance(data)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });
});
