import * as usersClient from '../..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getUserCredit.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('getUserCredit', () => {
  const expectedConfig = undefined;
  const id = '123456';
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = [
      {
        currency: 'GB',
        value: 50,
        formattedValue: '£50',
      },
    ];

    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(usersClient.getUserCredit(id)).resolves.toStrictEqual(
      response,
    );
    expect(spy).toHaveBeenCalledWith(
      `/legacy/v1/users/${id}/credits`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(usersClient.getUserCredit(id)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/legacy/v1/users/${id}/credits`,
      expectedConfig,
    );
  });
});
