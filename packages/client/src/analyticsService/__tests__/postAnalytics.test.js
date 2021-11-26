import { pageEventsData } from 'tests/__fixtures__/analytics';
import { pageTypes } from '@farfetch/blackout-analytics';
import { postAnalytics } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postAnalytics.fixtures';
import moxios from 'moxios';

describe('postAnalytics()', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  const spy = jest.spyOn(client, 'post');
  const data = {
    type: 'bar',
    version: 'foo',
    data: pageEventsData[pageTypes.HOMEPAGE],
  };

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({ response });

    await expect(postAnalytics(data)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      '/marketing/v1/analytics',
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure();

    await expect(postAnalytics(data)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      '/marketing/v1/analytics',
      data,
      expectedConfig,
    );
  });
});
