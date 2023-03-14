import { getExchange } from '..';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/getExchange.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('getExchange', () => {
  const spy = jest.spyOn(client, 'get');
  const id = '123456';
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixture.success(id, response);

    expect.assertions(2);

    await expect(getExchange(id)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/exchanges/${id}`),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixture.failure(id);

    expect.assertions(2);

    await expect(getExchange(id)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/exchanges/${id}`),
      expectedConfig,
    );
  });
});
