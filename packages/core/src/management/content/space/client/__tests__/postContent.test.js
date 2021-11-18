import { postSpaceContent } from '..';
import client from '../../../../../helpers/client';
import fixtures from '../__fixtures__/postContent.fixtures';
import moxios from 'moxios';

describe('postContent', () => {
  const spaceCode = 'emails';
  const expectedConfig = {
    baseURL: 'https://api.blackandwhite-ff.com',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};
    const data = {};

    fixtures.success({ spaceCode, response });

    expect.assertions(2);

    await expect(postSpaceContent(spaceCode, data)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/content/v1/spaces/${spaceCode}/contents`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    const data = {};

    fixtures.failure({ spaceCode });

    expect.assertions(2);

    await expect(postSpaceContent(spaceCode, data)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/content/v1/spaces/${spaceCode}/contents`,
      data,
      expectedConfig,
    );
  });
});
