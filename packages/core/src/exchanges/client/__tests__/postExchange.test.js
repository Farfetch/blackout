import { postExchange } from '..';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/postExchange.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('postExchange()', () => {
  const data = {
    exchangeGroups: [
      {
        exchangeReturnItems: [
          {
            orderCode: '4PLL9F',
            orderItemUuid: '25C0AF64-7D1A-40B2-BA58-155A4B0C6878',
          },
        ],
        exchangeItems: [
          {
            product: {
              id: 18061196,
              variantId: 'E1BD4075-2F19-4B8F-9BC5-25A8ACF75864',
              merchantId: 13708,
            },
          },
        ],
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

    await expect(postExchange(data)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      join('/account/v1/exchanges'),
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixture.failure();

    expect.assertions(2);

    await expect(postExchange(data)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join('/account/v1/exchanges'),
      data,
      expectedConfig,
    );
  });
});
