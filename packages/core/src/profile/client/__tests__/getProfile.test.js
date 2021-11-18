import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getProfile.fixtures';
import getProfile, { adaptGender, adaptStatus } from '../getProfile';
import join from 'proper-url-join';
import moxios from 'moxios';

const legacyMeResponse = {
  bagId: 'd764c07a-9ca7-4a40-994f-ba69e0c41f40',
  dateOfBirth: '/Date(547776000000)/',
  email: 'qat5@acme.com',
  gender: 0,
  id: 38081483,
  title: null,
  name: 'QA Test',
  phoneNumber: '+351-321312312312',
  segments: [],
  username: 'qat5@acme.com',
  wishlistId: '494bf046-5360-47b8-956f-83783b991d63',
  isExternalLogin: false,
  isGuest: false,
  guestBagItemsMerged: 0,
  status: 5,
  lastName: null,
  firstName: null,
  bag: null,
  wishlist: null,
  membership: null,
};

const accountSvcMeResponse = {
  bagId: 'ab04faef-1eaf-4473-b983-3da8c6b958a8',
  dateOfBirth: '1985-01-02T00:00:00Z',
  email: 'qat5@acme.com',
  gender: 'Male',
  id: 34113438,
  name: 'QT zerofive',
  phoneNumber: '+351-0000000000',
  segments: ['white-label-vip'],
  username: 'qat5@acme.com',
  wishlistId: '32712b8b-3da4-4c8a-b0d0-746c665b3129',
  isExternalLogin: false,
  isGuest: false,
  guestBagItemsMerged: 0,
  status: 'PendingEmailConfirmation',
  lastName: 'zerofive',
  firstName: 'QT',
  createdDate: '2020-03-09T14:51:19.124Z',
  updatedDate: '2021-05-04T10:03:31.706Z',
  countryCode: 'PT',
  receiveNewsletters: false,
};

const expectedAdapterAccSvcResponse = {
  ...accountSvcMeResponse,
  status: 4,
  gender: 1,
  dateOfBirth: '/Date(473472000000)/',
};

describe('getProfile', () => {
  const data = ['membership', 'bag'];
  const spy = jest.spyOn(client, 'get');
  const config = {};

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getProfile', () => {
    describe('Legacy', () => {
      const responseUrl = join('/legacy/v1/users/me', {
        query: {
          userExtraInfo: data,
        },
      });

      it('should handle a client request successfully', async () => {
        fixtures.legacy.success({ data, response: legacyMeResponse });

        expect.assertions(2);

        await expect(getProfile(data, config)).resolves.toBe(legacyMeResponse);

        expect(spy).toHaveBeenCalledWith(responseUrl, config);
      });

      it('should receive a client request error', async () => {
        fixtures.legacy.failure({ data });

        expect.assertions(2);

        await expect(getProfile(data, config)).rejects.toMatchSnapshot();

        expect(spy).toHaveBeenCalledWith(responseUrl, config);
      });
    });

    describe('Account Service', () => {
      it('should adapt gender to an appropriate number', () => {
        expect.assertions(4);

        expect(adaptGender('NotDefined')).toEqual(0);
        expect(adaptGender('Female')).toEqual(2);
        expect(adaptGender('Male')).toEqual(1);

        expect(adaptGender('')).toBeNull();
      });

      it('should adapt status to an appropriate number', () => {
        expect.assertions(8);

        expect(adaptStatus('Inactive')).toEqual(0);
        expect(adaptStatus('Disabled')).toEqual(1);
        expect(adaptStatus('Locked')).toEqual(2);
        expect(adaptStatus('PendingResetPassword')).toEqual(3);
        expect(adaptStatus('PendingEmailConfirmation')).toEqual(4);
        expect(adaptStatus('Active')).toEqual(5);
        expect(adaptStatus('Unknown')).toEqual(6);

        expect(adaptStatus('')).toBeNull();
      });

      const responseUrl = '/account/v1/users/me';

      it('should handle a client request successfully', async () => {
        fixtures.accsvc.success({ response: accountSvcMeResponse });

        expect.assertions(2);

        await expect(getProfile(config)).resolves.toEqual(
          expectedAdapterAccSvcResponse,
        );

        expect(spy).toHaveBeenCalledWith(responseUrl, config);
      });

      it('should receive a client request error', async () => {
        fixtures.accsvc.failure();

        expect.assertions(2);

        await expect(getProfile(config)).rejects.toMatchSnapshot();

        expect(spy).toHaveBeenCalledWith(responseUrl, config);
      });
    });
  });
});
