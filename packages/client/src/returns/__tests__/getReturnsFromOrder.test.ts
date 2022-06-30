import { getReturnsFromOrder } from '..';
import { mockOrderId, responses } from 'tests/__fixtures__/returns';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getReturnsFromOrder.fixtures';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer';

describe('getReturnsFromOrder', () => {
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;
  const query = { guestUserEmail: 'test@email.com' };
  const response = responses.get.success;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(response));

    expect.assertions(2);
    await expect(
      getReturnsFromOrder(mockOrderId, query),
    ).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      join('/account/v1/orders', mockOrderId, 'returns', {
        query,
      }),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);
    await expect(
      getReturnsFromOrder(mockOrderId, query),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      join('/account/v1/orders', mockOrderId, 'returns', {
        query,
      }),
      expectedConfig,
    );
  });
});
