import * as actionTypes from '../../actionTypes.js';
import { mockStore } from '../../../../../tests/index.js';
import reducer from '../../reducer.js';
import reset from '../resetAuthentication.js';
import type { SubAreaType } from '../../types/subArea.types.js';

const mockAction = { type: 'this_is_a_mock_action' };

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer(undefined, mockAction) }, state);

let store = authenticationMockStore();

const subAreas = {};

describe('resetAuthentication() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions when the reset authentication area is called with no subarea prop', async () => {
    await reset()(store.dispatch);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([{ type: actionTypes.RESET_AUTHENTICATION }]),
    );
  });

  it.each([
    'LOGIN',
    'LOGOUT',
    'PASSWORD_CHANGE',
    'PASSWORD_RECOVER',
    'PASSWORD_RESET',
    'REGISTER',
    'VALIDATE_EMAIL',
    'REFRESH_EMAIL_TOKEN',
    'REMOVE_TOKEN',
    'DELETE_USER_IMPERSONATION',
    'CREATE_USER_IMPERSONATION',
    'CREATE_USER_TOKEN',
    'CREATE_CLIENT_CREDENTIALS_TOKEN',
    'REFRESH_TOKEN',
  ])(
    'should create the correct actions when the reset authentication area is called with the %s subarea',
    async subArea => {
      await reset(subArea as SubAreaType)(store.dispatch);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes[`RESET_${subArea}` as keyof typeof subAreas] },
        ]),
      );
    },
  );
});
