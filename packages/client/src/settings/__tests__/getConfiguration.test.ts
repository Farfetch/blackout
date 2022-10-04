import { getConfiguration } from '..';
import { SchemaFieldType } from '../types';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getConfiguration.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getConfiguration', () => {
  const expectedConfig = undefined;
  const WHITELABEL_TENANT_ID = 25000;
  const code = '1234';
  const query = { tenantId: WHITELABEL_TENANT_ID };
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = {
      code,
      type: 'configuration',
      description: 'sample configuration',
      tenant: query.tenantId,
      properties: [
        {
          code: '111',
          description: 'sample property',
          value: 'sample',
          schemaFieldType: SchemaFieldType.String,
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
    };

    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(getConfiguration(code, query)).resolves.toStrictEqual(
      response,
    );

    expect(spy).toHaveBeenCalledWith(
      `/settings/v1/configurations/${code}?tenantId=${WHITELABEL_TENANT_ID}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(getConfiguration(code, query)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/settings/v1/configurations/${code}?tenantId=${WHITELABEL_TENANT_ID}`,
      expectedConfig,
    );
  });
});
