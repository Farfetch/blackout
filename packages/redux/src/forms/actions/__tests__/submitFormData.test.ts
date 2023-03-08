import { find } from 'lodash-es';
import { formsActionTypes } from '../../index.js';
import {
  formSchemaResponse,
  postFormDataPayload,
} from 'tests/__fixtures__/forms/index.mjs';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { postFormData } from '@farfetch/blackout-client';
import { submitFormData } from '../index.js';

const formsMockStore = (state = {}) =>
  mockStore({ forms: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store: ReturnType<typeof formsMockStore>;

jest.mock('@farfetch/blackout-client', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-client'),
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

    (postFormData as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await submitFormData(
          formSchemaResponse.code,
          postFormDataPayload,
          expectedConfig,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(postFormData).toHaveBeenCalledTimes(1);
    expect(postFormData).toHaveBeenCalledWith(
      formSchemaResponse.code,
      postFormDataPayload,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: formsActionTypes.SUBMIT_FORM_REQUEST,
        }),
      ]),
    );
  });

  it('should create the correct actions for when the submit form data procedure is successful', async () => {
    const mockResult = {
      foo: 'bar',
    };

    (postFormData as jest.Mock).mockResolvedValueOnce(mockResult);

    await submitFormData(
      formSchemaResponse.code,
      postFormDataPayload,
      expectedConfig,
    )(store.dispatch).then(clientResult => {
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
        expect.objectContaining({
          type: formsActionTypes.SUBMIT_FORM_REQUEST,
        }),
      ]),
    );
    expect(
      find(actionResults, {
        type: formsActionTypes.SUBMIT_FORM_SUCCESS,
      }),
    ).toMatchSnapshot('Submit form schemas payload');
  });
});
