import { getReturnsFromOrder } from '..';
import { responses } from 'tests/__fixtures__/returns';
import client from '../../helpers/client';
import fixture from '../__fixtures__/getReturnsFromOrder.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('getReturnsFromOrder', () => {
  const spy = jest.spyOn(client, 'get');
  const orderId = '123456';
  const expectedConfig = undefined;
  const query = { guestUserEmail: 'test@email.com' };
  const response = responses.get.success;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    fixture.success({ orderId, response, query });

    expect.assertions(2);
    await expect(getReturnsFromOrder(orderId, query)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      join('/account/v1/orders', orderId, 'returns', {
        query,
      }),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixture.failure({ orderId, query });

    expect.assertions(2);
    await expect(getReturnsFromOrder(orderId, query)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      join('/account/v1/orders', orderId, 'returns', {
        query,
      }),
      expectedConfig,
    );
  });
});
