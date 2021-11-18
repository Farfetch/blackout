import { getSpaceContent } from '..';
import client from '../../../../../helpers/client';
import fixtures from '../__fixtures__/getContent.fixtures';
import moxios from 'moxios';

describe('getContent', () => {
  const spaceCode = 'emails';
  const contentId = 'welcome';
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

    fixtures.success({ spaceCode, contentId, response });

    expect.assertions(2);

    await expect(getSpaceContent(spaceCode, contentId)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `${endpoint}/${spaceCode}/contents/${contentId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ spaceCode, contentId });

    expect.assertions(2);

    await expect(
      getSpaceContent(spaceCode, contentId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `${endpoint}/${spaceCode}/contents/${contentId}`,
      expectedConfig,
    );
  });
});
