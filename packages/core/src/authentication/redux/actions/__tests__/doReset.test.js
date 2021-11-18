import { mockStore } from '../../../../../tests';
import doReset from '../doReset';
import reducer, { actionTypes } from '../../';

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer() }, state);

let store;

describe('doReset() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions when the reset area is called with no subarea prop', async () => {
    expect.assertions(1);

    await store.dispatch(doReset());
    expect(store.getActions()).toEqual(
      expect.arrayContaining([{ type: actionTypes.AUTHENTICATION_RESET }]),
    );
  });

  it.each([
    'LOGIN',
    'LOGOUT',
    'REGISTER',
    'PASSWORD_CHANGE',
    'PASSWORD_RESET',
    'PASSWORD_RECOVER',
    'VALIDATE_EMAIL',
    'REFRESH_TOKEN',
    'REFRESH_EMAIL_TOKEN',
  ])(
    'should create the correct actions when the reset area is called with the %s subarea',
    async subArea => {
      expect.assertions(1);

      await store.dispatch(doReset(subArea));
      expect(store.getActions()).toEqual(
        expect.arrayContaining([{ type: actionTypes[`${subArea}_RESET`] }]),
      );
    },
  );
});
