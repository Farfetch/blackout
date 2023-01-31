import {
  contentQuery,
  expectedNormalizedPayload,
  mockContents,
} from 'tests/__fixtures__/contents';
import { doGetContent } from '../';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const contentsMockStore = (state = {}) =>
  mockStore({ contents: reducer() }, state);

const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
const expectedConfig = undefined;
let store;

beforeEach(jest.clearAllMocks);

describe('doGetContent() action creator', () => {
  const getContent = jest.fn();
  const action = doGetContent(getContent);

  beforeEach(() => {
    store = contentsMockStore();
  });

  it('should create the correct actions for when the get content procedure fails', async () => {
    const expectedError = new Error('Get content error');

    getContent.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(contentQuery));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getContent).toHaveBeenCalledTimes(1);
      expect(getContent).toHaveBeenCalledWith(contentQuery, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            {
              type: actionTypes.GET_CONTENT_FAILURE,
            },
            {
              payload: { error: expectedError },
              type: actionTypes.GET_CONTENT_FAILURE,
            },
          ),
        ]),
      );
    }
  });

  it('should create the correct actions for when the get content procedure is successful', async () => {
    getContent.mockResolvedValueOnce(mockContents);

    await store.dispatch(action(contentQuery));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getContent).toHaveBeenCalledTimes(1);
    expect(getContent).toHaveBeenCalledWith(contentQuery, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.GET_CONTENT_REQUEST,
          },
          {
            payload: expectedNormalizedPayload,
            type: actionTypes.GET_CONTENT_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, { type: actionTypes.GET_CONTENT_SUCCESS }),
    ).toMatchSnapshot('Get content payload');
  });
});
