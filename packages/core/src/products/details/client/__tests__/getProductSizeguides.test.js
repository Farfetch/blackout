import { getProductSizeguides } from '..';
import { mockProductId, mockSizeguides } from 'tests/__fixtures__/products';
import client from '../../../../helpers/client';
import fixtures from '../__fixtures__/getProductSizeguides.fixtures';
import moxios from 'moxios';

describe('getProductSizeguides', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockSizeguides;

    fixtures.success({
      id: mockProductId,
      response,
    });

    expect.assertions(2);

    await expect(getProductSizeguides(mockProductId)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/sizeguides`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ id: mockProductId });

    expect.assertions(2);
    await expect(getProductSizeguides(mockProductId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/sizeguides`,
      expectedConfig,
    );
  });
});
