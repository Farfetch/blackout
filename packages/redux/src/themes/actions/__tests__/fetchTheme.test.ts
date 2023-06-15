import * as actionTypes from '../../actionTypes.js';
import { fetchTheme } from '../index.js';
import { getTheme } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import {
  mockState,
  mockTheme,
  mockThemeCode,
} from 'tests/__fixtures__/themes/index.mjs';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getTheme: jest.fn(),
}));

const expectedConfig = undefined;
const themesMockStore = (state = {}) =>
  mockStore({ themes: INITIAL_STATE }, state);

let store = themesMockStore(mockState);

describe('fetchTheme() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = themesMockStore(mockState);
  });

  it('should create the correct actions for when the fetch styleguide theme fail', async () => {
    const expectedError = new Error('fetch styleguide themes error');

    (getTheme as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchTheme(mockThemeCode)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getTheme).toHaveBeenCalledTimes(1);
    expect(getTheme).toHaveBeenCalledWith(
      mockThemeCode,
      undefined,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_THEME_REQUEST,
        meta: { code: mockThemeCode },
      },
      {
        type: actionTypes.FETCH_THEME_FAILURE,
        payload: { error: expectedError },
        meta: { code: mockThemeCode },
      },
    ]);
  });

  it('should create the correct actions for when the fetch styleguide theme procedure is successful', async () => {
    (getTheme as jest.Mock).mockResolvedValueOnce(mockTheme);

    await fetchTheme(
      mockThemeCode,
      expectedConfig,
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(mockTheme);
    });

    expect(getTheme).toHaveBeenCalledTimes(1);
    expect(getTheme).toHaveBeenCalledWith(
      mockThemeCode,
      undefined,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_THEME_REQUEST,
        meta: { code: mockThemeCode },
      },
      {
        type: actionTypes.FETCH_THEME_SUCCESS,
        payload: { result: mockTheme },
        meta: { code: mockThemeCode },
      },
    ]);
  });
});
