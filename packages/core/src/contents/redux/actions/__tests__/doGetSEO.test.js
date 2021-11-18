import { doGetSEO } from '../';
import { mockResponse, seoQuery } from 'tests/__fixtures__/contents';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const contentsSEOMockStore = (state = {}) =>
  mockStore({ contents: reducer() }, state);

const expectedConfig = undefined;

describe('doGetSEO action creator', () => {
  const getSEO = jest.fn();
  const action = doGetSEO(getSEO);
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = contentsSEOMockStore();
  });

  it('should create the correct actions for when the get SEO procedure fails', async () => {
    const expectedError = new Error('Get SEO error');

    getSEO.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(seoQuery));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getSEO).toHaveBeenCalledTimes(1);
      expect(getSEO).toHaveBeenCalledWith(seoQuery, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            {
              type: actionTypes.GET_SEO_FAILURE,
            },
            {
              payload: { error: expectedError },
              type: actionTypes.GET_SEO_FAILURE,
            },
          ),
        ]),
      );
    }
  });

  it('should create the correct actions for when the get SEO procedure is successful', async () => {
    getSEO.mockResolvedValueOnce(mockResponse);

    await store.dispatch(action(seoQuery));

    const actionResults = store.getActions();

    expect(getSEO).toHaveBeenCalledTimes(1);
    expect(getSEO).toHaveBeenCalledWith(seoQuery, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.GET_SEO_SUCCESS,
          },
          {
            payload: mockResponse,
            type: actionTypes.GET_SEO_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, { type: actionTypes.GET_SEO_SUCCESS }),
    ).toMatchSnapshot('Get SEO payload');
  });
});
