import { postTrackings } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postTrackings.fixtures';
import moxios from 'moxios';

describe('postTrackings()', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  const spy = jest.spyOn(client, 'post');
  const data = {
    event: 'GenericPageVisited',
    correlationId: 'cc0dc41e-f058-40ec-a073-1fe3d56265bb',
    tenantId: 16000,
    clientId: 16000,
    customerId: 'g_123',
    parameters: {},
  };

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({ response });

    await expect(postTrackings(data)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      '/marketing/v1/trackings',
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure();

    await expect(postTrackings(data)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      '/marketing/v1/trackings',
      data,
      expectedConfig,
    );
  });
});
