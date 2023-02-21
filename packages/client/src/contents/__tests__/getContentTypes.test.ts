import { getContentTypes } from '../';
import { types as response } from 'tests/__fixtures__/contents';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/contentTypes.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getContentTypes()', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const spy = jest.spyOn(client, 'get');
  const spaceCode = 'website';

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(response));

    await expect(getContentTypes(spaceCode)).resolves.toEqual(response);

    expect(spy).toHaveBeenCalledWith(
      `/content/v1/spaces/${spaceCode}/contentTypes`,
      expectedConfig,
    );
  });

  it('should handle a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getContentTypes(spaceCode)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/content/v1/spaces/${spaceCode}/contentTypes`,
      expectedConfig,
    );
  });
});
