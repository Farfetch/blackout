import { postSpaceContentVersion } from '..';
import client from '../../../../../helpers/client';
import fixtures from '../__fixtures__/postContentVersion.fixtures';
import moxios from 'moxios';

describe('postContentVersion', () => {
  const spaceCode = 'emails';
  const contentId = 'welcome';
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

    fixtures.success({ spaceCode, contentId, response });

    expect.assertions(2);

    await expect(
      postSpaceContentVersion(spaceCode, contentId, data),
    ).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `${endpoint}/${spaceCode}/contents/${contentId}/versions`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    const data = {};

    fixtures.failure({ spaceCode, contentId });

    expect.assertions(2);

    await expect(
      postSpaceContentVersion(spaceCode, contentId, data),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `${endpoint}/${spaceCode}/contents/${contentId}/versions`,
      data,
      expectedConfig,
    );
  });
});
