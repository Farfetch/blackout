import { actionTypes } from '../../';
import { doPostFormData } from '../';
import {
  formSchemaResponse,
  postFormDataPayload,
  postFormDataResponse,
} from './__mocks__/formsSchema';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer from '../../reducer';

const formsMockStore = (state = {}) => mockStore(reducer(), state);
const expectedConfig = undefined;
let store;

beforeEach(jest.clearAllMocks);

describe('doPostFormData() action creator', () => {
  const postFormData = jest.fn();
  const action = doPostFormData(postFormData);

  beforeEach(() => {
    store = formsMockStore();
  });

  it('should create the correct actions when the post form schemas procedure fails', async () => {
    const expectedError = new Error('Get form schema error');

    postFormData.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(
        action(formSchemaResponse.code, postFormDataPayload, expectedConfig),
      );
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postFormData).toHaveBeenCalledTimes(1);
      expect(postFormData).toHaveBeenCalledWith(
        formSchemaResponse.code,
        postFormDataPayload,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            {
              type: actionTypes.SUBMIT_FORM_REQUEST,
            },
            {
              payload: { error: expectedError },
              type: actionTypes.SUBMIT_FORM_FAILURE,
            },
          ),
        ]),
      );
    }
  });

  it('should create the correct actions for when the post form schemas procedure is successful', async () => {
    postFormData.mockResolvedValueOnce();

    await store.dispatch(
      action(formSchemaResponse.code, postFormDataPayload, expectedConfig),
    );

    const actionResults = store.getActions();

    expect(postFormData).toHaveBeenCalledTimes(1);
    expect(postFormData).toHaveBeenCalledWith(
      formSchemaResponse.code,
      postFormDataPayload,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.SUBMIT_FORM_REQUEST,
          },
          {
            payload: postFormDataResponse,
            type: actionTypes.SUBMIT_FORM_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, {
        type: actionTypes.GET_FORM_SCHEMA_SUCCESS,
      }),
    ).toMatchSnapshot('Post form schemas payload');
  });
});
