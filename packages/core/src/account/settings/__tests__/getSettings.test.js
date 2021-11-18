import { getSettings } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getSettings.fixtures';
import moxios from 'moxios';

describe('getSettings', () => {
  const query = {
    channelCode: 'channel_abc',
  };
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = [
      {
        id: 1121,
        tenant: 52000,
        type: 'Castle',
        channelCode: 'string',
        details: {
          api_secret: 'secret',
          baseUrl: 'url',
          timeout: 1000,
        },
      },
      {
        id: 4536345,
        tenant: 48000,
        type: 'Generic',
        channelCode: 'string',
        details: {
          items: {
            key1: 'value1',
            key2: 'value2',
            key3: 'value3',
          },
        },
      },
    ];
    fixtures.success({ query, response });

    await expect(getSettings(query)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/settings?channelCode=${query.channelCode}`,
      undefined,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ query });

    await expect(getSettings(query)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/settings?channelCode=${query.channelCode}`,
      undefined,
    );
  });
});
