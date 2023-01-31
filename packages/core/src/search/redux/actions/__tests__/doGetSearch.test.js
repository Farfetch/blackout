// @TODO: Remove this file in version 2.0.0.
import { doGetSearch } from '../';
import {
  mockSearchIntentsQuery,
  mockSearchIntentsResponse,
} from 'tests/__fixtures__/search';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const searchMockStore = (state = {}) => mockStore({ search: reducer() }, state);

describe('doGetSearch() action creator', () => {
  let store;
  const getSearch = jest.fn();
  const action = doGetSearch(getSearch);
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();

    store = searchMockStore();
  });

  it('should create the correct actions for when the get search procedure fails', async () => {
    const expectedError = new Error('Get search error');

    getSearch.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockSearchIntentsQuery));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getSearch).toHaveBeenCalledTimes(1);
      expect(getSearch).toHaveBeenCalledWith(
        mockSearchIntentsQuery,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            {
              type: actionTypes.GET_SEARCH_REQUEST,
            },
            {
              meta: mockSearchIntentsQuery,
              payload: { error: expectedError },
              type: actionTypes.GET_SEARCH_FAILURE,
            },
          ),
        ]),
      );
    }
  });

  it('should create the correct actions for when the get search procedure is successful', async () => {
    getSearch.mockResolvedValueOnce(mockSearchIntentsResponse);

    await store.dispatch(action(mockSearchIntentsQuery));

    const actionResults = store.getActions();

    expect(getSearch).toHaveBeenCalledTimes(1);
    expect(getSearch).toHaveBeenCalledWith(
      mockSearchIntentsQuery,
      expectedConfig,
    );
    expect(actionResults).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.GET_SEARCH_REQUEST,
          },
          {
            meta: mockSearchIntentsQuery,
            payload: mockSearchIntentsResponse,
            type: actionTypes.GET_SEARCH_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, { type: actionTypes.GET_SEARCH_SUCCESS }),
    ).toMatchSnapshot('Get search success payload');
  });
});
