import { getConfigurations } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getConfigurations.fixtures';
import moxios from 'moxios';

describe('getConfigurations', () => {
  const expectedConfig = undefined;
  const WHITELABEL_TENANT_ID = 25000;
  const query = { tenantId: WHITELABEL_TENANT_ID };
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {
      number: 1,
      totalPages: 1,
      totalItems: 1,
      items: [
        {
          code: '1234',
          type: 'configuration',
          description: 'sample configuration',
          tenant: query.tenantId,
          properties: [
            {
              code: '111',
              description: 'sample property',
              value: 'sample',
              schemaFieldType: 'string',
              security: {
                resources: [
                  {
                    name: 'sample resource',
                    action: 'resource',
                  },
                ],
                scopes: ['sample'],
              },
            },
          ],
        },
      ],
    };

    fixtures.success({
      query,
      response,
    });

    expect.assertions(2);

    await expect(getConfigurations(query)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/settings/v1/configurations?tenantId=${WHITELABEL_TENANT_ID}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ query });

    expect.assertions(2);

    await expect(getConfigurations(query)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/settings/v1/configurations?tenantId=${WHITELABEL_TENANT_ID}`,
      expectedConfig,
    );
  });
});
