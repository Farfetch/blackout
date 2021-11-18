import { getMeasurements } from '..';
import { mockMeasurements, mockProductId } from 'tests/__fixtures__/products';
import client from '../../../../helpers/client';
import fixtures from '../__fixtures__/getMeasurements.fixtures';
import moxios from 'moxios';

describe('getMeasurements', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockMeasurements;

    fixtures.success({
      id: mockProductId,
      response,
    });

    await expect(getMeasurements(mockProductId)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/variantsMeasurements`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({
      id: mockProductId,
    });

    await expect(getMeasurements(mockProductId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/variantsMeasurements`,
      expectedConfig,
    );
  });
});
