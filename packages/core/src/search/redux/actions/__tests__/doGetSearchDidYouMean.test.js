import { doGetSearchDidYouMean } from '../';
import {
  mockSearchDidYouMeanQuery,
  mockSearchDidYouMeanResponse,
} from 'tests/__fixtures__/search';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const searchMockStore = (state = {}) => mockStore({ search: reducer() }, state);

describe('doGetSearchDidYouMean() action creator', () => {
  let store;
  const getSearchDidYouMean = jest.fn();
  const action = doGetSearchDidYouMean(getSearchDidYouMean);
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();

    store = searchMockStore();
  });

  it('should create the correct actions for when the get search did you mean procedure fails', async () => {
    const expectedError = new Error('Get search did you mean error');

    getSearchDidYouMean.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockSearchDidYouMeanQuery));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getSearchDidYouMean).toHaveBeenCalledTimes(1);
      expect(getSearchDidYouMean).toHaveBeenCalledWith(
        mockSearchDidYouMeanQuery,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            {
              type: actionTypes.GET_SEARCH_DID_YOU_MEAN_REQUEST,
            },
            {
              meta: mockSearchDidYouMeanQuery,
              payload: { error: expectedError },
              type: actionTypes.GET_SEARCH_DID_YOU_MEAN_FAILURE,
            },
          ),
        ]),
      );
    }
  });

  it('should create the correct actions for when the get search did you mean procedure is successful', async () => {
    getSearchDidYouMean.mockResolvedValueOnce(mockSearchDidYouMeanResponse);

    await store.dispatch(action(mockSearchDidYouMeanQuery));

    const actionResults = store.getActions();

    expect(getSearchDidYouMean).toHaveBeenCalledTimes(1);
    expect(getSearchDidYouMean).toHaveBeenCalledWith(
      mockSearchDidYouMeanQuery,
      expectedConfig,
    );
    expect(actionResults).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.GET_SEARCH_DID_YOU_MEAN_REQUEST,
          },
          {
            meta: mockSearchDidYouMeanQuery,
            payload: mockSearchDidYouMeanResponse,
            type: actionTypes.GET_SEARCH_DID_YOU_MEAN_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, {
        type: actionTypes.GET_SEARCH_DID_YOU_MEAN_SUCCESS,
      }),
    ).toMatchSnapshot('Get search did you mean success payload');
  });
});
