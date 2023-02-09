import {
  mockBagId,
  mockBagPromocodesData,
  mockBagPromocodesResponse,
} from 'tests/__fixtures__/bags';
import { putBagPromocodes } from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/putBagPromocodes.fixtures';
import moxios from 'moxios';

describe('putBagPromocodes', () => {
  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  const spy = jest.spyOn(client, 'put');
  const expectedConfig = undefined;
  const response = mockBagPromocodesResponse;
  const urlToBeCalled = `/commerce/v1/bags/${mockBagId}/promocodes`;

  it('should handle a client request successfully', async () => {
    fixtures.success({
      bagId: mockBagId,
      response,
    });

    await expect(
      putBagPromocodes(mockBagId, mockBagPromocodesData),
    ).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      urlToBeCalled,
      mockBagPromocodesData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ bagId: mockBagId, response });

    await expect(
      putBagPromocodes(mockBagId, mockBagPromocodesData),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      urlToBeCalled,
      mockBagPromocodesData,
      expectedConfig,
    );
  });
});
