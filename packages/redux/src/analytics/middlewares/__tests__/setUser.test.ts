import * as authenticationActionTypes from '../../../users/authentication/actionTypes.js';
import * as usersActionTypes from '../../../users/actionTypes.js';
import {
  type default as Analytics,
  EventTypes,
  LoginMethodParameterTypes,
  type UserData,
  type UserTraits,
} from '@farfetch/blackout-analytics';
import {
  DEFAULT_TRIGGER_ANONYMIZE_ACTION_TYPES,
  DEFAULT_TRIGGER_SET_USER_ACTION_TYPES,
  OPTION_FETCH_USER_ID_SELECTOR,
  OPTION_FETCH_USER_SELECTOR,
  OPTION_TRIGGER_ANONYMIZE_ACTIONS,
  OPTION_TRIGGER_SET_USER_ACTIONS,
  OPTION_USER_TRAITS_PICKER,
} from '../setUser.js';
import { getUser, getUserId } from '../../../users/selectors.js';
import { mockStore } from './../tests/simplifiedStore.js';
import { mockUsersResponse } from 'tests/__fixtures__/users/index.mjs';
import { pick } from 'lodash-es';
import { UserGender } from '@farfetch/blackout-client';
import TestStorage from 'test-storage';

jest.mock('@farfetch/blackout-analytics/utils', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-analytics/utils'),
    logger: {
      error: jest.fn(),
      warn: jest.fn(),
    },
  };
});

let analytics: Analytics;
let setUserSpy: jest.SpyInstance;
let anonymizeSpy: jest.SpyInstance;
let trackSpy: jest.SpyInstance;

const loggedInUserId = 1;

const loggedInUserInfo = {
  ...mockUsersResponse,
  isGuest: false,
  email: 'user@test.com',
  segments: ['segment1', 'segment2'],
  username: 'user',
  bagId: '1ff36cd1-0dac-497f-8f32-4f2f7bdd2eaf',
  gender: UserGender.Male,
  membership: [],
  id: undefined,
};

const loggedInUserEntity = {
  ...loggedInUserInfo,
  id: loggedInUserId,
};

const guestUserId = 2;
const guestUserInfo = {
  ...mockUsersResponse,
  isGuest: true,
  bagId: '522fa1f7-4ced-68e7-f9d4-Bc6s2eff43f5',
  id: undefined,
};

const guestUserEntity = {
  ...guestUserInfo,
  id: guestUserId,
};

const mockStateLoggedInUser = {
  entities: {
    user: loggedInUserEntity,
  },
};

const mockStateGuestUser = {
  entities: {
    user: guestUserEntity,
  },
};

async function dispatchUserChangingAction(
  store: ReturnType<typeof mockStore>,
  actionType: string,
  userEntity: Record<string, unknown>,
  meta?: Record<string, unknown>,
) {
  return await store.dispatch({
    type: actionType,
    payload: {
      entities: {
        user: userEntity,
      },
    },
    meta,
  });
}

function assertSetUserSpyCalledWith(
  expectedUserId: UserData['id'],
  expectedTraits: UserTraits,
) {
  expect(setUserSpy).toHaveBeenCalledTimes(1);

  expect(setUserSpy).toHaveBeenCalledWith(expectedUserId, expectedTraits);
}

describe('analyticsSetUserMiddleware', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Analytics = require('@farfetch/blackout-analytics').default;

    analytics = new Analytics();
    analytics.setStorage(new TestStorage());
    setUserSpy = jest.spyOn(analytics, 'setUser');
    anonymizeSpy = jest.spyOn(analytics, 'anonymize');
    trackSpy = jest.spyOn(analytics, 'track');
  });

  it('Should log an error if an analytics instance is not passed', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { analyticsSetUserMiddleware } = require('../setUser');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { utils } = require('@farfetch/blackout-analytics');
    const loggerErrorSpy = jest.spyOn(utils.logger, 'error');

    // test undefined value
    analyticsSetUserMiddleware(undefined);

    expect(loggerErrorSpy).toHaveBeenCalled();

    jest.clearAllMocks();

    // test instanceof
    analyticsSetUserMiddleware({});

    expect(loggerErrorSpy).toHaveBeenCalled();
  });

  describe('When called with no options', () => {
    it.each(Array.from(DEFAULT_TRIGGER_SET_USER_ACTION_TYPES))(
      "Should call 'analytics.setUser' with the correct values by default when %s is dispatched",
      async actionType => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { analyticsSetUserMiddleware } = require('../setUser');

        const store = mockStore(mockStateGuestUser, [
          analyticsSetUserMiddleware(analytics),
        ]);

        await dispatchUserChangingAction(store, actionType, loggedInUserEntity);

        assertSetUserSpyCalledWith(loggedInUserId, loggedInUserInfo);
      },
    );

    it.each(Array.from(DEFAULT_TRIGGER_ANONYMIZE_ACTION_TYPES))(
      "Should call 'analytics.anonymize' by default when %s is dispatched",
      async actionType => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { analyticsSetUserMiddleware } = require('../setUser');

        const store = mockStore(mockStateGuestUser, [
          analyticsSetUserMiddleware(analytics),
        ]);

        await store.dispatch({
          type: actionType,
        });

        expect(anonymizeSpy).toHaveBeenCalled();
      },
    );

    it("Should not call 'analytics.setUser' when any other action is dispatched", async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { analyticsSetUserMiddleware } = require('../setUser');

      const store = mockStore(mockStateGuestUser, [
        analyticsSetUserMiddleware(analytics),
      ]);

      await store.dispatch({
        type: authenticationActionTypes.LOGOUT_FAILURE,
      });

      expect(setUserSpy).not.toHaveBeenCalled();
    });
  });

  describe('When options is an array or set of action types', () => {
    it('Should allow to specify a set of action types that will be listened to instead of the default ones', async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { analyticsSetUserMiddleware } = require('../setUser');

      const store = mockStore(mockStateGuestUser, [
        analyticsSetUserMiddleware(
          analytics,
          new Set(['NEW_LOGIN_SUCCESS_TYPE', 'NEW_ACTION_TYPE']),
        ),
      ]);

      await dispatchUserChangingAction(
        store,
        'NEW_LOGIN_SUCCESS_TYPE',
        loggedInUserEntity,
      );

      assertSetUserSpyCalledWith(loggedInUserId, loggedInUserInfo);

      jest.clearAllMocks();

      await dispatchUserChangingAction(
        store,
        'NEW_ACTION_TYPE',
        guestUserEntity,
      );

      assertSetUserSpyCalledWith(guestUserId, guestUserInfo);
    });

    it('Should log an error and use the default action types when the actionTypes passed in is not of the proper type', async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { analyticsSetUserMiddleware } = require('../setUser');
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { utils } = require('@farfetch/blackout-analytics');
      const loggerErrorSpy = jest.spyOn(utils.logger, 'error');

      const store = mockStore(mockStateGuestUser, [
        analyticsSetUserMiddleware(analytics, 'NEW_ACTION_TYPE'),
      ]);

      expect(loggerErrorSpy).toHaveBeenCalled();

      await dispatchUserChangingAction(
        store,
        authenticationActionTypes.LOGIN_SUCCESS,
        loggedInUserEntity,
      );

      assertSetUserSpyCalledWith(loggedInUserId, loggedInUserInfo);
    });
  });

  describe('When options is a plain object', () => {
    it('Should allow to specify options to the middleware', async () => {
      const triggerSetUserActions = new Set(['MY_SET_USER_ACTION']);
      const triggerAnonymizeActions = new Set(['MY_ANONYMIZE_ACTION']);
      const traitsToPick = ['isGuest', 'membership'];

      const options = {
        [OPTION_FETCH_USER_SELECTOR]: jest.fn(getUser),
        [OPTION_FETCH_USER_ID_SELECTOR]: jest.fn(getUserId),
        [OPTION_TRIGGER_SET_USER_ACTIONS]: triggerSetUserActions,
        [OPTION_TRIGGER_ANONYMIZE_ACTIONS]: triggerAnonymizeActions,
        [OPTION_USER_TRAITS_PICKER]: jest.fn(user => pick(user, traitsToPick)),
      };

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { analyticsSetUserMiddleware } = require('../setUser');

      const store = mockStore(mockStateGuestUser, [
        analyticsSetUserMiddleware(analytics, options),
      ]);

      await dispatchUserChangingAction(
        store,
        Array.from(triggerSetUserActions)[0] as string,
        loggedInUserEntity,
      );

      // @ts-expect-error This cast is just to facilitate testing as we would need to specify all user properties for it to comply
      assertSetUserSpyCalledWith(loggedInUserId, {
        isGuest: loggedInUserInfo.isGuest,
        membership: loggedInUserInfo.membership,
      } as UserTraits);

      expect(options[OPTION_FETCH_USER_SELECTOR]).toHaveBeenCalledTimes(1);
      expect(options[OPTION_FETCH_USER_ID_SELECTOR]).toHaveBeenCalledTimes(2);
      expect(options[OPTION_USER_TRAITS_PICKER]).toHaveBeenCalledTimes(1);

      // Dispatch a default action to trigger a setUser call
      // to check if it will continue to trigger after specifying
      // the actions to call setUser (they shouldn't)

      Array.from(DEFAULT_TRIGGER_SET_USER_ACTION_TYPES).forEach(
        async actionType => {
          jest.clearAllMocks();

          await dispatchUserChangingAction(
            store,
            actionType,
            loggedInUserEntity,
          );

          expect(setUserSpy).not.toHaveBeenCalled();
        },
      );

      jest.clearAllMocks();

      // Check for anonymize actions

      await store.dispatch({
        type: Array.from(triggerAnonymizeActions)[0],
      });

      expect(anonymizeSpy).toHaveBeenCalledTimes(1);

      // Dispatch a default action to trigger an anonymize call
      // to check if it will continue to trigger after specifying
      // the actions to call anonymize (they shouldn't)

      Array.from(DEFAULT_TRIGGER_ANONYMIZE_ACTION_TYPES).forEach(
        async actionType => {
          jest.clearAllMocks();

          await store.dispatch({
            type: actionType,
          });

          expect(anonymizeSpy).not.toHaveBeenCalled();
        },
      );
    });

    it('Should use DEFAULT_TRIGGER_ANONYMIZE_ACTION_TYPES when config object does not contain triggerAnonymizeActions prop', async () => {
      const triggerSetUserActions = new Set(['MY_SET_USER_ACTION']);
      const triggerAnonymizeActions = DEFAULT_TRIGGER_ANONYMIZE_ACTION_TYPES;
      const traitsToPick = ['isGuest', 'membership'];

      const options = {
        [OPTION_FETCH_USER_SELECTOR]: jest.fn(getUser),
        [OPTION_FETCH_USER_ID_SELECTOR]: jest.fn(getUserId),
        [OPTION_TRIGGER_SET_USER_ACTIONS]: triggerSetUserActions,
        [OPTION_USER_TRAITS_PICKER]: jest.fn(user => pick(user, traitsToPick)),
      };

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { analyticsSetUserMiddleware } = require('../setUser');

      const store = mockStore(mockStateGuestUser, [
        analyticsSetUserMiddleware(analytics, options),
      ]);

      // Check for anonymize actions

      await store.dispatch({
        type: Array.from(triggerAnonymizeActions)[0],
      });

      expect(anonymizeSpy).toHaveBeenCalledTimes(1);
    });

    it('Should adapt triggers properties from "array" to "Set"', async () => {
      const triggerSetUserActions = ['MY_SET_USER_ACTION'];
      const triggerAnonymizeActions = ['MY_ANONYMIZE_ACTION'];
      const traitsToPick = ['isGuest', 'membership'];

      const options = {
        [OPTION_FETCH_USER_SELECTOR]: jest.fn(getUser),
        [OPTION_FETCH_USER_ID_SELECTOR]: jest.fn(getUserId),
        [OPTION_TRIGGER_SET_USER_ACTIONS]: triggerSetUserActions,
        [OPTION_TRIGGER_ANONYMIZE_ACTIONS]: triggerAnonymizeActions,
        [OPTION_USER_TRAITS_PICKER]: jest.fn(user => pick(user, traitsToPick)),
      };

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { analyticsSetUserMiddleware } = require('../setUser');

      const store = mockStore(mockStateGuestUser, [
        analyticsSetUserMiddleware(analytics, options),
      ]);

      await dispatchUserChangingAction(
        store,
        triggerSetUserActions[0] as string,
        loggedInUserEntity,
      );

      // @ts-expect-error This cast is just to facilitate testing as we would need to specify all user properties for it to comply
      assertSetUserSpyCalledWith(loggedInUserId, {
        isGuest: loggedInUserInfo.isGuest,
        membership: loggedInUserInfo.membership,
      } as UserTraits);

      jest.clearAllMocks();
      // Check for anonymize actions

      await store.dispatch({
        type: triggerAnonymizeActions[0],
      });

      expect(anonymizeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Triggering login / logout / signup events', () => {
    it('Should trigger a login event when a login success action is dispatched', async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { analyticsSetUserMiddleware } = require('../setUser');

      const store = mockStore(mockStateGuestUser, [
        analyticsSetUserMiddleware(analytics),
      ]);

      await dispatchUserChangingAction(
        store,
        authenticationActionTypes.LOGIN_SUCCESS,
        loggedInUserEntity,
        { isLoginAction: true, method: LoginMethodParameterTypes.TENANT },
      );

      assertSetUserSpyCalledWith(loggedInUserId, loggedInUserInfo);

      expect(trackSpy).toHaveBeenCalledWith(EventTypes.LOGIN, {
        method: LoginMethodParameterTypes.TENANT,
      });
    });

    it('Should trigger a signup event when a register success action is dispatched', async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { analyticsSetUserMiddleware } = require('../setUser');

      const store = mockStore(mockStateGuestUser, [
        analyticsSetUserMiddleware(analytics),
      ]);

      await dispatchUserChangingAction(
        store,
        authenticationActionTypes.REGISTER_SUCCESS,
        loggedInUserEntity,
        { isRegisterAction: true, method: LoginMethodParameterTypes.TENANT },
      );

      assertSetUserSpyCalledWith(loggedInUserId, loggedInUserInfo);

      expect(trackSpy).toHaveBeenCalledWith(EventTypes.SIGNUP_FORM_COMPLETED, {
        method: LoginMethodParameterTypes.TENANT,
      });
    });

    it('Should trigger a logout event when the user changes to a guest user from a logged in user (session expired)', async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { analyticsSetUserMiddleware } = require('../setUser');

      const store = mockStore(mockStateGuestUser, [
        analyticsSetUserMiddleware(analytics),
      ]);

      // Set user as logged in
      await dispatchUserChangingAction(
        store,
        authenticationActionTypes.LOGIN_SUCCESS,
        loggedInUserEntity,
        { isLoginAction: true, method: LoginMethodParameterTypes.TENANT },
      );

      assertSetUserSpyCalledWith(loggedInUserId, loggedInUserInfo);

      jest.clearAllMocks();

      // Change the user to a guest now
      await dispatchUserChangingAction(
        store,
        usersActionTypes.FETCH_USER_SUCCESS,
        guestUserEntity,
      );

      assertSetUserSpyCalledWith(guestUserId, guestUserInfo);

      expect(trackSpy).toHaveBeenCalledWith(EventTypes.LOGOUT);
    });

    it('Should trigger a logout event when the user changes to a guest user from a logged in user (Manual logout)', async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { analyticsSetUserMiddleware } = require('../setUser');

      const store = mockStore(mockStateGuestUser, [
        analyticsSetUserMiddleware(analytics),
      ]);

      // Set user as logged in
      await dispatchUserChangingAction(
        store,
        authenticationActionTypes.LOGIN_SUCCESS,
        loggedInUserEntity,
        { isLoginAction: true, method: LoginMethodParameterTypes.TENANT },
      );

      assertSetUserSpyCalledWith(loggedInUserId, loggedInUserInfo);

      jest.clearAllMocks();

      // Change the user to a guest now
      await dispatchUserChangingAction(
        store,
        authenticationActionTypes.LOGOUT_SUCCESS,
        guestUserEntity,
      );

      expect(trackSpy).toHaveBeenCalledWith(EventTypes.LOGOUT);
      expect(anonymizeSpy).toHaveBeenCalled();
    });

    it('Should not track any event if there was not a change to the user logged-in status', async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { analyticsSetUserMiddleware } = require('../setUser');

      const store = mockStore(mockStateLoggedInUser, [
        analyticsSetUserMiddleware(analytics),
      ]);

      await dispatchUserChangingAction(
        store,
        usersActionTypes.FETCH_USER_SUCCESS,
        loggedInUserEntity,
        { isLoginAction: false, method: LoginMethodParameterTypes.TENANT },
      );

      assertSetUserSpyCalledWith(loggedInUserId, loggedInUserInfo);

      expect(trackSpy).not.toHaveBeenCalled();
    });
  });
});
