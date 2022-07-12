import { contentsActionTypes as actionTypes } from '../..';
import { fetchSEO } from '..';
import { getSEO } from '@farfetch/blackout-client/contents';
import { INITIAL_STATE_CONTENT } from '../../reducer';
import { mockStore } from '../../../../tests';
import { seoQuery, seoResponse } from 'tests/__fixtures__/contents';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/contents', () => ({
  ...jest.requireActual('@farfetch/blackout-client/contents'),
  getSEO: jest.fn(),
}));
const contentsSEOMockStore = (state = {}) =>
  mockStore({ contents: INITIAL_STATE_CONTENT }, state);

const expectedConfig = undefined;
let store;

describe('fetchSEO action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = contentsSEOMockStore();
  });

  it('should create the correct actions for when the get SEO procedure fails', async () => {
    const expectedError = new Error('Get SEO error');

    getSEO.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(fetchSEO(seoQuery)).catch(error => {
      expect(error).toBe(expectedError);
      expect(getSEO).toHaveBeenCalledTimes(1);
      expect(getSEO).toHaveBeenCalledWith(seoQuery, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            {
              type: actionTypes.FETCH_SEO_FAILURE,
            },
            {
              payload: { error: expectedError },
              type: actionTypes.FETCH_SEO_FAILURE,
            },
          ),
        ]),
      );
    });
  });

  it('should create the correct actions for when the get SEO procedure is successful', async () => {
    getSEO.mockResolvedValueOnce(seoResponse);

    await store
      .dispatch(fetchSEO(seoQuery))
      .then(result => expect(result).toBe(seoResponse));

    const actionResults = store.getActions();

    expect(getSEO).toHaveBeenCalledTimes(1);
    expect(getSEO).toHaveBeenCalledWith(seoQuery, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.FETCH_SEO_SUCCESS,
          },
          {
            payload: seoResponse,
            type: actionTypes.FETCH_SEO_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, { type: actionTypes.FETCH_SEO_SUCCESS }),
    ).toMatchSnapshot('Get SEO payload');
  });
});
