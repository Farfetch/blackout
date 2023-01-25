import { mockRaffleResponse, raffleId } from 'tests/__fixtures__/raffles';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getRaffle.fixtures';
import getRaffle from '../getRaffle';
import mswServer from '../../../tests/mswServer';

describe('getRaffle', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const urlToBeCalled = `/checkout/v1/raffles/${raffleId}`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockRaffleResponse));

    await expect(getRaffle(raffleId)).resolves.toStrictEqual(
      mockRaffleResponse,
    );

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getRaffle(raffleId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
