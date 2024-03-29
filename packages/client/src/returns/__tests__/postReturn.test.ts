import { mockPostData, responses } from 'tests/__fixtures__/returns/index.mjs';
import { postReturn } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/postReturn.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('postReturn()', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = responses.post.success;

    mswServer.use(fixtures.success(response));

    await expect(postReturn(mockPostData)).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/returns',
      mockPostData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(postReturn(mockPostData)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/returns',
      mockPostData,
      expectedConfig,
    );
  });
});
