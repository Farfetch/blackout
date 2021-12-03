import { actionTypes as authenticationActionTypes } from '../../../authentication';
import { combineReducers } from 'redux';
import {
  DEFAULT_TRIGGER_ANONYMIZE_ACTION_TYPES,
  DEFAULT_TRIGGER_SET_USER_ACTION_TYPES,
  OPTION_FETCH_USER_ID_SELECTOR,
  OPTION_FETCH_USER_SELECTOR,
  OPTION_TRIGGER_ANONYMIZE_ACTIONS,
  OPTION_TRIGGER_SET_USER_ACTIONS,
  OPTION_USER_TRAITS_PICKER,
} from '../setUser';
import {
  eventTypes,
  loginMethodParameterTypes,
} from '@farfetch/blackout-analytics';
import { getUser, getUserId } from '../../../entities/selectors';
import { actionTypes as usersActionTypes } from '@farfetch/blackout-redux/users';
import pick from 'lodash/pick';
import TestStorage from 'test-storage';

// Mock logger so it does not output to the console
jest.mock('@farfetch/blackout-client/helpers', () => ({
  ...jest.requireActual('@farfetch/blackout-client/helpers'),
  Logger: class {
    warn(message) {
      return message;
    }
    error(message) {
      return message;
    }
  },
}));

let analytics;
let setUserSpy;
let anonymizeSpy;
let trackSpy;

const loggedInUserId = 1;

const loggedInUserInfo = {
  isGuest: false,
  email: 'user@test.com',
  segments: ['segment1', 'segment2'],
  username: 'user',
  bagId: '1ff36cd1-0dac-497f-8f32-4f2f7bdd2eaf',
  gender: 1,
  membership: [],
};

const loggedInUserEntity = {
  id: loggedInUserId,
  ...loggedInUserInfo,
};

const guestUserId = 2;
const guestUserInfo = {
  isGuest: true,
  bagId: '522fa1f7-4ced-68e7-f9d4-Bc6s2eff43f5',
};

const guestUserEntity = {
  id: guestUserId,
  ...guestUserInfo,
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

// This is a simplified version of our createEntitiesReducer()
// This version was used instead, because createEntitiesReducer
// does not override completely user data, so makes testing
// a little more difficult. In runtime, that is not a problem.
const entitiesReducer = (state = {}, action = {}) => {
  if (action.payload && action.payload.entities) {
    return Object.assign({}, state, action.payload.entities);
  }

  return state;
};

const reducer = combineReducers({
  entities: entitiesReducer,
});

// This is a very simplified redux store implementation.
// This was needed because our mockStore module that is based on
// redux-mock-store package does not execute the reducers
// which were needed for this test suite.
const mockStore = (initialState, middlewares) => {
  const store = {
    state: initialState,

    getState() {
      return this.state;
    },

    async dispatch(action) {
      const next = action => {
        this.state = reducer(this.state, action);
      };

      await Promise.all(
        middlewares.map(middleware => middleware(this)(next)(action)),
      );
    },
  };

  return store;
};

async function dispatchUserChangingAction(store, actionType, userEntity, meta) {
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

function assertSetUserSpyCalledWith(expectedUserId, expectedTraits) {
  expect(setUserSpy).toHaveBeenCalledTimes(1);

  expect(setUserSpy).toHaveBeenCalledWith(expectedUserId, expectedTraits);
}

describe('setUserMiddleware', () => {
  beforeEach(() => {
    jest.resetModuleRegistry();
    jest.clearAllMocks();

    const Analytics = require('@farfetch/blackout-analytics').default;

    analytics = new Analytics();
    analytics.setStorage(new TestStorage());
    setUserSpy = jest.spyOn(analytics, 'setUser');
    anonymizeSpy = jest.spyOn(analytics, 'anonymize');
    trackSpy = jest.spyOn(analytics, 'track');
  });

  it('Should log an error if an analytics instance is not passed', () => {
    const setUserMiddleware = require('../setUser').default;
    const { logger } = require('@farfetch/blackout-analytics/utils');
    const loggerErrorSpy = jest.spyOn(logger, 'error');

    // test undefined value
    setUserMiddleware(undefined);

    expect(loggerErrorSpy).toBeCalled();

    jest.clearAllMocks();

    // test instanceof
    setUserMiddleware({});

    expect(loggerErrorSpy).toBeCalled();
  });

  describe('When called with no options', () => {
    it.each(Array.from(DEFAULT_TRIGGER_SET_USER_ACTION_TYPES))(
      "Should call 'analytics.setUser' with the correct values by default when %s is dispatched",
      async actionType => {
        const setUserMiddleware = require('../setUser').default;

        const store = mockStore(mockStateGuestUser, [
          setUserMiddleware(analytics),
        ]);

        await dispatchUserChangingAction(store, actionType, loggedInUserEntity);

        assertSetUserSpyCalledWith(loggedInUserId, loggedInUserInfo);
      },
    );

    it.each(Array.from(DEFAULT_TRIGGER_ANONYMIZE_ACTION_TYPES))(
      "Should call 'analytics.anonymize' by default when %s is dispatched",
      async actionType => {
        const setUserMiddleware = require('../setUser').default;

        const store = mockStore(mockStateGuestUser, [
          setUserMiddleware(analytics),
        ]);

        await store.dispatch({
          type: actionType,
        });

        expect(anonymizeSpy).toHaveBeenCalled();
      },
    );

    it("Should not call 'analytics.setUser' when any other action is dispatched", async () => {
      const setUserMiddleware = require('../setUser').default;

      const store = mockStore(mockStateGuestUser, [
        setUserMiddleware(analytics),
      ]);

      await store.dispatch({
        type: authenticationActionTypes.LOGOUT_FAILURE,
      });

      expect(setUserSpy).not.toHaveBeenCalled();
    });
  });

  describe('When options is an array or set of action types', () => {
    it('Should allow to specify a set of action types that will be listened to instead of the default ones', async () => {
      const setUserMiddleware = require('../setUser').default;

      const store = mockStore(mockStateGuestUser, [
        setUserMiddleware(
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
      const setUserMiddleware = require('../setUser').default;
      const { logger } = require('@farfetch/blackout-analytics/utils');
      const loggerErrorSpy = jest.spyOn(logger, 'error');

      const store = mockStore(mockStateGuestUser, [
        setUserMiddleware(analytics, 'NEW_ACTION_TYPE'),
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

      const setUserMiddleware = require('../setUser').default;

      const store = mockStore(mockStateGuestUser, [
        setUserMiddleware(analytics, options),
      ]);

      await dispatchUserChangingAction(
        store,
        Array.from(triggerSetUserActions)[0],
        loggedInUserEntity,
      );

      assertSetUserSpyCalledWith(
        loggedInUserId,
        pick(loggedInUserInfo, traitsToPick),
      );

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

      const setUserMiddleware = require('../setUser').default;

      const store = mockStore(mockStateGuestUser, [
        setUserMiddleware(analytics, options),
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

      const setUserMiddleware = require('../setUser').default;

      const store = mockStore(mockStateGuestUser, [
        setUserMiddleware(analytics, options),
      ]);

      await dispatchUserChangingAction(
        store,
        triggerSetUserActions[0],
        loggedInUserEntity,
      );

      assertSetUserSpyCalledWith(
        loggedInUserId,
        pick(loggedInUserInfo, traitsToPick),
      );

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
      const setUserMiddleware = require('../setUser').default;

      const store = mockStore(mockStateGuestUser, [
        setUserMiddleware(analytics),
      ]);

      await dispatchUserChangingAction(
        store,
        authenticationActionTypes.LOGIN_SUCCESS,
        loggedInUserEntity,
        { isLoginAction: true, method: loginMethodParameterTypes.TENANT },
      );

      assertSetUserSpyCalledWith(loggedInUserId, loggedInUserInfo);

      expect(trackSpy).toHaveBeenCalledWith(eventTypes.LOGIN, {
        method: loginMethodParameterTypes.TENANT,
      });
    });

    it('Should trigger a signup event when a register success action is dispatched', async () => {
      const setUserMiddleware = require('../setUser').default;

      const store = mockStore(mockStateGuestUser, [
        setUserMiddleware(analytics),
      ]);

      await dispatchUserChangingAction(
        store,
        authenticationActionTypes.REGISTER_SUCCESS,
        loggedInUserEntity,
        { isRegisterAction: true, method: loginMethodParameterTypes.TENANT },
      );

      assertSetUserSpyCalledWith(loggedInUserId, loggedInUserInfo);

      expect(trackSpy).toHaveBeenCalledWith(eventTypes.SIGNUP_FORM_COMPLETED, {
        method: loginMethodParameterTypes.TENANT,
      });
    });

    it('Should trigger a logout event when the user changes to a guest user from a logged in user', async () => {
      const setUserMiddleware = require('../setUser').default;

      const store = mockStore(mockStateGuestUser, [
        setUserMiddleware(analytics),
      ]);

      // Set user as logged in
      await dispatchUserChangingAction(
        store,
        authenticationActionTypes.LOGIN_SUCCESS,
        loggedInUserEntity,
        { isLoginAction: true, method: loginMethodParameterTypes.TENANT },
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

      expect(trackSpy).toHaveBeenCalledWith(eventTypes.LOGOUT);
    });

    it('Should not track any event if there was not a change to the user logged-in status', async () => {
      const setUserMiddleware = require('../setUser').default;

      const store = mockStore(mockStateLoggedInUser, [
        setUserMiddleware(analytics),
      ]);

      await dispatchUserChangingAction(
        store,
        usersActionTypes.FETCH_USER_SUCCESS,
        loggedInUserEntity,
        { isLoginAction: false, method: loginMethodParameterTypes.TENANT },
      );

      assertSetUserSpyCalledWith(loggedInUserId, loggedInUserInfo);

      expect(trackSpy).not.toHaveBeenCalled();
    });
  });
});
