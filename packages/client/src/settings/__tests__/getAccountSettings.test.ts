import { getAccountSettings } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getAccountSettings.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getAccountSettings', () => {
  const expectedConfig = undefined;
  const WHITELABEL_TENANT_ID = 25000;
  const query = { type: 'PasswordRules' };
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = {
      channelCode: '1234',
      type: query.type,
      tenantId: WHITELABEL_TENANT_ID,
      details: {
        rules: [
          {
            name: '',
            regex: '',
          },
          {
            name: '',
            regex: '',
          },
        ],
        differFromLastPass: 3,
      },
    };

    mswServer.use(fixtures.success(response));

    await expect(getAccountSettings(query)).resolves.toStrictEqual(response);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/settings?type=${query.type}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getAccountSettings(query)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/settings?type=${query.type}`,
      expectedConfig,
    );
  });
});
