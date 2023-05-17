import { postTracking } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/postTracking.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('postTracking()', () => {
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

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

    mswServer.use(fixtures.success(response));

    await expect(postTracking(data)).resolves.toStrictEqual(response);

    expect(spy).toHaveBeenCalledWith(
      '/marketing/v1/trackings',
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(postTracking(data)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      '/marketing/v1/trackings',
      data,
      expectedConfig,
    );
  });
});
