import { patchSpaceContentVersionPublication } from '..';
import client from '../../../../../helpers/client';
import fixtures from '../__fixtures__/patchContentVersionPublication.fixtures';
import moxios from 'moxios';

describe('patchContentVersionPublication', () => {
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
  const spy = jest.spyOn(client, 'patch');
  const endpoint = '/content/v1/spaces';

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};
    const data = {};

    fixtures.success({
      spaceCode,
      contentId,
      versionId,
      publicationId,
      response,
    });

    expect.assertions(2);

    await expect(
      patchSpaceContentVersionPublication(
        spaceCode,
        contentId,
        versionId,
        publicationId,
        data,
      ),
    ).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `${endpoint}/${spaceCode}/contents/${contentId}/versions/${versionId}/publications/${publicationId}`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    const data = {};

    fixtures.failure({ spaceCode, contentId, versionId, publicationId });

    expect.assertions(2);

    await expect(
      patchSpaceContentVersionPublication(
        spaceCode,
        contentId,
        versionId,
        publicationId,
        data,
      ),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `${endpoint}/${spaceCode}/contents/${contentId}/versions/${versionId}/publications/${publicationId}`,
      data,
      expectedConfig,
    );
  });
});
