import { doGetSearchSuggestions } from '../';
import {
  mockSearchSuggestionsQuery,
  mockSearchSuggestionsResponse,
} from 'tests/__fixtures__/search';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const searchMockStore = (state = {}) => mockStore({ search: reducer() }, state);

describe('doGetSearchSuggestions() action creator', () => {
  let store;
  const getSearchSuggestions = jest.fn();
  const action = doGetSearchSuggestions(getSearchSuggestions);
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();

    store = searchMockStore();
  });

  it('should create the correct actions for when the get search suggestions procedure fails', async () => {
    const expectedError = new Error('Get search suggestions error');

    getSearchSuggestions.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockSearchSuggestionsQuery));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getSearchSuggestions).toHaveBeenCalledTimes(1);
      expect(getSearchSuggestions).toHaveBeenCalledWith(
        mockSearchSuggestionsQuery,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            {
              type: actionTypes.GET_SEARCH_SUGGESTIONS_REQUEST,
            },
            {
              meta: mockSearchSuggestionsQuery,
              payload: { error: expectedError },
              type: actionTypes.GET_SEARCH_SUGGESTIONS_FAILURE,
            },
          ),
        ]),
      );
    }
  });

  it('should create the correct actions for when the get search suggestion procedure is successful', async () => {
    getSearchSuggestions.mockResolvedValueOnce(mockSearchSuggestionsResponse);

    await store.dispatch(action(mockSearchSuggestionsQuery));

    const actionResults = store.getActions();

    expect(getSearchSuggestions).toHaveBeenCalledTimes(1);
    expect(getSearchSuggestions).toHaveBeenCalledWith(
      mockSearchSuggestionsQuery,
      expectedConfig,
    );
    expect(actionResults).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.GET_SEARCH_SUGGESTIONS_REQUEST,
          },
          {
            meta: mockSearchSuggestionsQuery,
            payload: mockSearchSuggestionsResponse,
            type: actionTypes.GET_SEARCH_SUGGESTIONS_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, {
        type: actionTypes.GET_SEARCH_SUGGESTIONS_SUCCESS,
      }),
    ).toMatchSnapshot('Get search suggestions success payload');
  });
});
