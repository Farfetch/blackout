import { getMerchantsLocations } from '..';
import {
  mockMerchantLocation,
  mockQuery,
} from 'tests/__fixtures__/merchantsLocations';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getMerchantsLocations.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getMerchantsLocations', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    const response = [mockMerchantLocation];

    mswServer.use(fixtures.success(response));
    expect.assertions(2);

    await expect(getMerchantsLocations(mockQuery)).resolves.toEqual(response);

    expect(spy).toHaveBeenCalledWith(
      '/commerce/v1/merchantsLocations?merchantIds=1111%7C9359&merchantLocationIds=2222%7C1467',
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());
    expect.assertions(2);

    await expect(getMerchantsLocations(mockQuery)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      '/commerce/v1/merchantsLocations?merchantIds=1111%7C9359&merchantLocationIds=2222%7C1467',
      expectedConfig,
    );
  });
});
