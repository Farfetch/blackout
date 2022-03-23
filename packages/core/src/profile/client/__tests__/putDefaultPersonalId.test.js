import { putDefaultPersonalId } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/putDefaultPersonalId.fixtures';
import moxios from 'moxios';

describe('putDefaultPersonalId', () => {
  const expectedConfig = undefined;
  const userId = 123456;
  const data = {
    id: '123456',
  };
  const spy = jest.spyOn(client, 'put');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success(userId, response);

    expect.assertions(2);

    await expect(putDefaultPersonalId(userId, data)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalIds/default`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure(userId);

    expect.assertions(2);

    await expect(putDefaultPersonalId(userId, data)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalIds/default`,
      data,
      expectedConfig,
    );
  });
});
