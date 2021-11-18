import { getSpaceComponents } from '..';
import client from '../../../../../helpers/client';
import fixtures from '../__fixtures__/getComponents.fixtures';
import moxios from 'moxios';

describe('getComponents', () => {
  const spaceCode = 'emails';
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

    fixtures.success({ spaceCode, response });

    expect.assertions(2);

    await expect(getSpaceComponents(spaceCode)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `${endpoint}/${spaceCode}/components`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ spaceCode });

    expect.assertions(2);

    await expect(getSpaceComponents(spaceCode)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `${endpoint}/${spaceCode}/components`,
      expectedConfig,
    );
  });
});
