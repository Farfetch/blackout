import { mockPostData, responses } from 'tests/__fixtures__/returns';
import { postReturn } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postReturn.fixtures';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer';

describe('postReturn()', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;
  const query = { guestUserEmail: 'test@email.com' };

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = responses.post.success;

    mswServer.use(fixtures.success(response));

    expect.assertions(2);
    await expect(postReturn(mockPostData, query)).resolves.toStrictEqual(
      response,
    );
    expect(spy).toHaveBeenCalledWith(
      join('/account/v1/returns/', { query }),
      mockPostData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);
    await expect(postReturn(mockPostData, query)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      join('/account/v1/returns/', { query }),
      mockPostData,
      expectedConfig,
    );
  });
});
