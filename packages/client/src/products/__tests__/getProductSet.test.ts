import { getProductSet } from '../index.js';
import { mockSet, mockSetId } from 'tests/__fixtures__/products/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getProductSet.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getProductSet', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockSet));

    await expect(getProductSet(mockSetId)).resolves.toEqual(mockSet);
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sets/${mockSetId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getProductSet(mockSetId, {})).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sets/${mockSetId}`,
      expectedConfig,
    );
  });
});
