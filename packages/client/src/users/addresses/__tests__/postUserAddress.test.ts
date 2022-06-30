import { address2, userId } from 'tests/__fixtures__/addresses';
import { postUserAddress } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postUserAddress.fixtures';
import mswServer from '../../../../tests/mswServer';

const data = address2;
const response = address2;

describe('postUserAddress', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(postUserAddress({ userId }, response)).resolves.toStrictEqual(
      response,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/addresses`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(
      postUserAddress({ userId }, response),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/addresses`,
      data,
      expectedConfig,
    );
  });
});
