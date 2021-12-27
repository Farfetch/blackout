import { getUserAttribute } from '..';
import { UserAttributesResponse } from '../types';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getUserAttribute.fixtures';
import moxios from 'moxios';

describe('getUserAttribute', () => {
  const expectedConfig = undefined;
  const userId = 123456;
  const attributeId = '123456';
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response: UserAttributesResponse = {
      id: '',
      type: '',
      channelCode: '',
      tenandId: 0,
      userId: 0,
      details: {
        referralToken: '',
        rewardsCardNumber: '',
        joinRewards: false,
      },
    };

    fixtures.success({ userId, attributeId, response });

    expect.assertions(2);

    await expect(getUserAttribute(userId, attributeId)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/attributes/${attributeId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ userId, attributeId });

    expect.assertions(2);
    await expect(
      getUserAttribute(userId, attributeId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/attributes/${attributeId}`,
      expectedConfig,
    );
  });
});
