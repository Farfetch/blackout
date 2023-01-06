import { getProductOutfits } from '..';
import { mockOutfits, mockProductId } from 'tests/__fixtures__/products';
import client from '../../../../helpers/client';
import fixtures from '../__fixtures__/getProductOutfits.fixtures';
import moxios from 'moxios';

describe('getProductOutfits', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockOutfits;

    fixtures.success({
      id: mockProductId,
      response,
    });

    expect.assertions(2);

    await expect(getProductOutfits(mockProductId)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/outfits`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ id: mockProductId });

    expect.assertions(2);
    await expect(getProductOutfits(mockProductId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/outfits`,
      expectedConfig,
    );
  });
});
