import { getBagOperation } from '..//index.js';
import {
  mockBagId,
  mockBagOperation,
  mockBagOperationId,
} from 'tests/__fixtures__/bags/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getBagOperation.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getBagOperation', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    const response = mockBagOperation;

    mswServer.use(fixtures.success(response));

    await expect(
      getBagOperation(mockBagId, mockBagOperationId),
    ).resolves.toEqual(response);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}/operations/${mockBagOperationId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getBagOperation(mockBagId, mockBagOperationId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}/operations/${mockBagOperationId}`,
      expectedConfig,
    );
  });
});
