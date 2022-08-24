import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../../tests';
import reducer from '../../reducer';
import reset from '../resetAuthentication';
import type { SubAreaType } from '../../types/subArea.types';

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
    expect.assertions(1);

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
    'DELETE_USER_TOKEN',
    'DELETE_USER_IMPERSONATION',
    'CREATE_USER_IMPERSONATION',
    'CREATE_USER_TOKEN',
    'CREATE_CLIENT_CREDENTIALS_TOKEN',
    'REFRESH_USER_TOKEN',
  ])(
    'should create the correct actions when the reset authentication area is called with the %s subarea',
    async subArea => {
      expect.assertions(1);

      await reset(subArea as SubAreaType)(store.dispatch);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes[`RESET_${subArea}` as keyof typeof subAreas] },
        ]),
      );
    },
  );
});
