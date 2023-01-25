import { mockRafflesResponse } from 'tests/__fixtures__/raffles';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getRaffles.fixtures';
import getRaffles from '../getRaffles';
import mswServer from '../../../tests/mswServer';

const expectedConfig = undefined;
beforeEach(jest.clearAllMocks);

describe('getRaffles', () => {
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockRafflesResponse));

    await expect(getRaffles()).resolves.toStrictEqual(mockRafflesResponse);

    expect(spy).toHaveBeenCalledWith('/checkout/v1/raffles', expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getRaffles()).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith('/checkout/v1/raffles', expectedConfig);
  });
});
