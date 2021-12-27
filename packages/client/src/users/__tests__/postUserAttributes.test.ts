import * as profileClient from '..';
import { UserAttributesData, UserAttributesResponse } from '../types';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postUserAttributes.fixtures';
import moxios from 'moxios';

describe('postUserAttributes', () => {
  const expectedConfig = undefined;
  const data: UserAttributesData = {
    type: '',
    userId: 0,
    channelCode: '',
    details: {
      referralToken: '',
      rewardsCardNumber: '',
      joinRewards: false,
    },
  };
  const userId = 123456;
  const spy = jest.spyOn(client, 'post');

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

    fixtures.success({ userId, response });

    expect.assertions(2);

    await expect(profileClient.postUserAttributes(userId, data)).resolves.toBe(
      response,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/attributes`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ userId });

    expect.assertions(2);

    await expect(
      profileClient.postUserAttributes(userId, data),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/attributes`,
      data,
      expectedConfig,
    );
  });
});
