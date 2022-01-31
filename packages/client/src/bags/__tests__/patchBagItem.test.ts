import {
  mockBagId,
  mockBagItemId,
  mockData,
  mockResponse,
} from 'tests/__fixtures__/bags';
import { patchBagItem } from '../';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/patchBagItem.fixtures';
import mswServer from '../../../tests/mswServer';

describe('patchBagItem', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'patch');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockResponse));

    expect.assertions(2);

    await expect(
      patchBagItem(mockBagId, mockBagItemId, mockData),
    ).resolves.toEqual(mockResponse);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}/items/${mockBagItemId}`,
      mockData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

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
