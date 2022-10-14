import { ConfigurationSchemaFieldType } from '../types';
import { getConfigurations } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getConfigurations.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getConfigurations', () => {
  const expectedConfig = undefined;
  const WHITELABEL_TENANT_ID = 25000;
  const query = { tenantId: WHITELABEL_TENANT_ID };
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = {
      number: 1,
      totalPages: 1,
      totalItems: 1,
      entries: [
        {
          code: '1234',
          type: 'configuration',
          description: 'sample configuration',
          tenantId: query.tenantId,
          properties: [
            {
              code: '111',
              description: 'sample property',
              value: 'sample',
              schemaFieldType: ConfigurationSchemaFieldType.String,
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

    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(getConfigurations(query)).resolves.toStrictEqual(response);

    expect(spy).toHaveBeenCalledWith(
      `/settings/v1/configurations?tenantId=${WHITELABEL_TENANT_ID}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(getConfigurations(query)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/settings/v1/configurations?tenantId=${WHITELABEL_TENANT_ID}`,
      expectedConfig,
    );
  });
});
