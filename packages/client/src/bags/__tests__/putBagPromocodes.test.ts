import {
  mockBagId,
  mockBagPromocodesData,
  mockBagPromocodesResponse,
} from 'tests/__fixtures__/bags';
import { putBagPromocodes } from '../';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/putBagPromocodes.fixtures';
import mswServer from '../../../tests/mswServer';

describe('putBagPromocodes', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'put');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockBagPromocodesResponse));

    await expect(
      putBagPromocodes(mockBagId, mockBagPromocodesData),
    ).resolves.toEqual(mockBagPromocodesResponse);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}/promocodes`,
      mockBagPromocodesData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      putBagPromocodes(mockBagId, mockBagPromocodesData),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}/promocodes`,
      mockBagPromocodesData,
      expectedConfig,
    );
  });
});
