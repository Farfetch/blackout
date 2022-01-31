import { getSet } from '..';
import { mockSet, mockSetId } from 'tests/__fixtures__/products';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getSet.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getSet', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockSet));

    expect.assertions(2);

    await expect(getSet(mockSetId)).resolves.toEqual(mockSet);
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sets/${mockSetId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(getSet(mockSetId, {})).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sets/${mockSetId}`,
      expectedConfig,
    );
  });
});
