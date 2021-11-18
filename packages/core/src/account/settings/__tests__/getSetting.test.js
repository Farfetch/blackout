import { getSetting } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getSetting.fixtures';
import moxios from 'moxios';

describe('getSetting', () => {
  const settingId = '98896469-c02b-4fe6-a38d-ebaf86f8c6c7';
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {
      id: 1121,
      tenant: 52000,
      type: 'Castle',
      channelCode: 'string',
      details: {
        api_secret: 'secret',
        baseUrl: 'url',
        timeout: 1000,
      },
    };

    fixtures.success({ id: settingId, response });

    await expect(getSetting(settingId)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/settings/${settingId}`,
      undefined,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ id: settingId });

    await expect(getSetting(settingId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/settings/${settingId}`,
      undefined,
    );
  });
});
