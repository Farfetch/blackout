import {
  mockBagId,
  mockBagItemId,
  mockData,
  mockResponse,
} from 'tests/__fixtures__/bags';
import { patchBagItem } from '../';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/patchBagItem.fixtures';
import moxios from 'moxios';

describe('patchBagItem', () => {
  const expectedConfig = undefined;
  const response = mockResponse;
  const spy = jest.spyOn(client, 'patch');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    fixtures.success({
      bagId: mockBagId,
      bagItemId: mockBagItemId,
      response,
    });

    expect.assertions(2);

    await expect(
      patchBagItem(mockBagId, mockBagItemId, mockData),
    ).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}/items/${mockBagItemId}`,
      mockData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({
      bagId: mockBagId,
      bagItemId: mockBagItemId,
    });

    expect.assertions(2);

    await expect(
      patchBagItem(mockBagId, mockBagItemId, mockData),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}/items/${mockBagItemId}`,
      mockData,
      expectedConfig,
    );
  });
});
