import { getSpaceContentVersionPublication } from '..';
import client from '../../../../../helpers/client';
import fixtures from '../__fixtures__/getContentVersionPublication.fixtures';
import moxios from 'moxios';

describe('getContentVersionPublication', () => {
  const spaceCode = 'emails';
  const contentId = 'welcome';
  const versionId = '1.0';
  const publicationId = 'foo';
  const expectedConfig = {
    baseURL: 'https://api.blackandwhite-ff.com',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const spy = jest.spyOn(client, 'get');
  const endpoint = '/content/v1/spaces';

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({
      spaceCode,
      contentId,
      versionId,
      publicationId,
      response,
    });

    expect.assertions(2);

    await expect(
      getSpaceContentVersionPublication(
        spaceCode,
        contentId,
        versionId,
        publicationId,
      ),
    ).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `${endpoint}/${spaceCode}/contents/${contentId}/versions/${versionId}/publications/${publicationId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ spaceCode, contentId, versionId, publicationId });

    expect.assertions(2);

    await expect(
      getSpaceContentVersionPublication(
        spaceCode,
        contentId,
        versionId,
        publicationId,
      ),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `${endpoint}/${spaceCode}/contents/${contentId}/versions/${versionId}/publications/${publicationId}`,
      expectedConfig,
    );
  });
});
