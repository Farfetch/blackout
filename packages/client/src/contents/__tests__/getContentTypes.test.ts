import { getContentTypes } from '../index.js';
import { types as response } from 'tests/__fixtures__/contents/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/contentTypes.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

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
