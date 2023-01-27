import { getBagOperations } from '../';
import { mockBagId, mockBagOperations } from 'tests/__fixtures__/bags';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getBagOperations.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getBagOperations', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    const response = mockBagOperations;

    mswServer.use(fixtures.success(response));

    await expect(
      getBagOperations(mockBagId, { sort: ['createdDate:desc'] }),
    ).resolves.toEqual(response);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}/operations?sort=createdDate%3Adesc`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getBagOperations(mockBagId, { sort: ['createdDate:desc'] }),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}/operations?sort=createdDate%3Adesc`,
      expectedConfig,
    );
  });
});
