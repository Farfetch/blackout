import { actionTypes } from '../..';
import {
  formSchemaResponse,
  postFormDataPayload,
  postFormDataResponse,
} from 'tests/__fixtures__/forms/formsSchema';
import { mockStore } from 'redux/tests';
import { postFormData } from '@farfetch/blackout-client/forms';
import { submitFormData } from '..';
import find from 'lodash/find';
import reducer from '../../reducer';

const formsMockStore = (state = {}) => mockStore(reducer(), state);
const expectedConfig = undefined;
let store;

jest.mock('@farfetch/blackout-client/forms', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-client/forms'),
    postFormData: jest.fn(),
  };
});

beforeEach(jest.clearAllMocks);

describe('submitFormData() action creator', () => {
  beforeEach(() => {
    store = formsMockStore();
  });

  it('should create the correct actions when the submit form data procedure fails', async () => {
    const expectedError = new Error('Submit form data error');

    postFormData.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store
      .dispatch(
        submitFormData(
          formSchemaResponse.code,
          postFormDataPayload,
          expectedConfig,
        ),
      )
      .catch(error => {
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
      });
  });

  it('should create the correct actions for when the submit form data procedure is successful', async () => {
    const mockResult = {
      foo: 'bar',
    };
    postFormData.mockResolvedValueOnce(mockResult);

    await store
      .dispatch(
        submitFormData(
          formSchemaResponse.code,
          postFormDataPayload,
          expectedConfig,
        ),
      )
      .then(clientResult => {
        expect(clientResult).toBe(mockResult);
      });

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
        type: actionTypes.SUBMIT_FORM_SUCCESS,
      }),
    ).toMatchSnapshot('Submit form schemas payload');
  });
});
