import { getProductSizeGuides } from '..';
import { mockProductId, mockSizeGuides } from 'tests/__fixtures__/products';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getProductSizeGuides.fixtures';
import moxios from 'moxios';

describe('getProductSizeGuides', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockSizeGuides;

    fixtures.success({
      id: mockProductId,
      response,
    });

    expect.assertions(2);

    await expect(getProductSizeGuides(mockProductId)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/sizeguides`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ id: mockProductId });

    expect.assertions(2);
    await expect(getProductSizeGuides(mockProductId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/sizeguides`,
      expectedConfig,
    );
  });
});
