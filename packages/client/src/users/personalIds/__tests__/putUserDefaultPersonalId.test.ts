import {
  mockPutDefaultPersonalIdData,
  mockPutDefaultPersonalIdResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { putUserDefaultPersonalId } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/putUserDefaultPersonalId.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('putDefaultPersonalId', () => {
  const expectedConfig = {
    'X-SUMMER-RequestId': 'test',
  };

  const config = {
    'X-SUMMER-RequestId': 'test',
  };
  const spy = jest.spyOn(client, 'put');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockPutDefaultPersonalIdResponse));

    await expect(
      putUserDefaultPersonalId(userId, mockPutDefaultPersonalIdData, config),
    ).resolves.toStrictEqual(mockPutDefaultPersonalIdResponse);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalIds/default`,
      mockPutDefaultPersonalIdData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      putUserDefaultPersonalId(userId, mockPutDefaultPersonalIdData, config),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalIds/default`,
      mockPutDefaultPersonalIdData,
      expectedConfig,
    );
  });
});
