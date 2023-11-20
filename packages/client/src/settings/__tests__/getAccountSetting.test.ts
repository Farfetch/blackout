import { getAccountSetting } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getAccountSetting.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getAccountSetting', () => {
  const expectedConfig = undefined;
  const WHITELABEL_TENANT_ID = 25000;
  const settingId = '1234';
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = {
      id: settingId,
      channelCode: '1234',
      type: '',
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

    await expect(getAccountSetting(settingId)).resolves.toStrictEqual(response);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/settings/${settingId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getAccountSetting(settingId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/settings/${settingId}`,
      expectedConfig,
    );
  });
});
