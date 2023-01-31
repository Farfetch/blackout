import { postRender } from '..';
import client from '../../../../helpers/client';
import fixtures from '../__fixtures__/postRender.fixtures';
import moxios from 'moxios';

describe('postRender', () => {
  const expectedConfig = {
    baseURL: 'https://api.blackandwhite-ff.com',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const spy = jest.spyOn(client, 'post');
  const endpoint = '/content/v1';

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};
    const data = {};

    fixtures.success({ response });

    expect.assertions(2);

    await expect(postRender(data)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `${endpoint}/render`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    const data = {};

    fixtures.failure();

    expect.assertions(2);

    await expect(postRender(data)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `${endpoint}/render`,
      data,
      expectedConfig,
    );
  });
});
