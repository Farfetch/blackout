import { getMerchantsLocations } from '..';
import {
  mockMerchantLocation,
  mockQuery,
} from 'tests/__fixtures__/merchantsLocations';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getMerchantsLocations.fixtures';
import moxios from 'moxios';

describe('getMerchantsLocations', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = [mockMerchantLocation];

    fixtures.success({
      query: mockQuery,
      response,
    });

    await expect(getMerchantsLocations(mockQuery)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      '/commerce/v1/merchantsLocations?merchantIds=1111%7C9359&merchantLocationIds=2222%7C1467',
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({
      query: mockQuery,
    });

    await expect(getMerchantsLocations(mockQuery)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/commerce/v1/merchantsLocations?merchantIds=1111%7C9359&merchantLocationIds=2222%7C1467',
      expectedConfig,
    );
  });
});
