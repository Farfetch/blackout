import { postSpaceContentVersionPublications } from '..';
import client from '../../../../../helpers/client';
import fixtures from '../__fixtures__/postContentVersionPublications.fixtures';
import moxios from 'moxios';

describe('postContentVersionPublications', () => {
  const spaceCode = 'emails';
  const contentId = 'welcome';
  const versionId = '1.0';
  const expectedConfig = {
    baseURL: 'https://api.blackandwhite-ff.com',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const spy = jest.spyOn(client, 'post');
  const endpoint = '/content/v1/spaces';

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};
    const data = {};

    fixtures.success({ spaceCode, contentId, versionId, response });

    expect.assertions(2);

    await expect(
      postSpaceContentVersionPublications(
        spaceCode,
        contentId,
        versionId,
        data,
      ),
    ).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `${endpoint}/${spaceCode}/contents/${contentId}/versions/${versionId}/publications`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    const data = {};

    fixtures.failure({ spaceCode, contentId, versionId });

    expect.assertions(2);

    await expect(
      postSpaceContentVersionPublications(
        spaceCode,
        contentId,
        versionId,
        data,
      ),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `${endpoint}/${spaceCode}/contents/${contentId}/versions/${versionId}/publications`,
      data,
      expectedConfig,
    );
  });
});
