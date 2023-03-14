import { postExchangeFilter } from '..';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/postExchangeFilter.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('postExchangeFilter()', () => {
  const data = {
    exchangeFilterItems: [
      {
        orderCode: 'ABC123',
        orderItemUuid: '123456',
      },
    ],
  };
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixture.success(response);

    expect.assertions(2);

    await expect(postExchangeFilter(data)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      join('/account/v1/exchangeFilters'),
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixture.failure();

    expect.assertions(2);

    await expect(postExchangeFilter(data)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join('/account/v1/exchangeFilters'),
      data,
      expectedConfig,
    );
  });
});
