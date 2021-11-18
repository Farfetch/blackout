import { doGetSearchIntents } from '../';
import {
  mockSearchIntentsQuery,
  mockSearchIntentsResponse,
} from 'tests/__fixtures__/search';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const searchMockStore = (state = {}) => mockStore({ search: reducer() }, state);

describe('doGetSearchIntents() action creator', () => {
  let store;
  const getSearchIntents = jest.fn();
  const action = doGetSearchIntents(getSearchIntents);
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();

    store = searchMockStore();
  });

  it('should create the correct actions for when the get search intents procedure fails', async () => {
    const expectedError = new Error('Get search intents error');

    getSearchIntents.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockSearchIntentsQuery));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getSearchIntents).toHaveBeenCalledTimes(1);
      expect(getSearchIntents).toHaveBeenCalledWith(
        mockSearchIntentsQuery,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            {
              type: actionTypes.GET_SEARCH_INTENTS_REQUEST,
            },
            {
              meta: mockSearchIntentsQuery,
              payload: { error: expectedError },
              type: actionTypes.GET_SEARCH_INTENTS_FAILURE,
            },
          ),
        ]),
      );
    }
  });

  it('should create the correct actions for when the get search intents procedure is successful', async () => {
    getSearchIntents.mockResolvedValueOnce(mockSearchIntentsResponse);

    await store.dispatch(action(mockSearchIntentsQuery));

    const actionResults = store.getActions();

    expect(getSearchIntents).toHaveBeenCalledTimes(1);
    expect(getSearchIntents).toHaveBeenCalledWith(
      mockSearchIntentsQuery,
      expectedConfig,
    );
    expect(actionResults).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.GET_SEARCH_INTENTS_REQUEST,
          },
          {
            meta: mockSearchIntentsQuery,
            payload: mockSearchIntentsResponse,
            type: actionTypes.GET_SEARCH_INTENTS_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, {
        type: actionTypes.GET_SEARCH_INTENTS_SUCCESS,
      }),
    ).toMatchSnapshot('Get search intents success payload');
  });
});
