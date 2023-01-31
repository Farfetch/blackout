import * as formReducer from '../reducer';
import * as selectors from '../selectors';
import { formSchemaResponse } from '../actions/__tests__/__mocks__/formsSchema';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('contents redux selectors', () => {
  const mockState = {
    forms: {
      result: { [formSchemaResponse.code]: formSchemaResponse },
      error: { [formSchemaResponse.code]: 'Error - Content not loaded.' },
      isLoading: { [formSchemaResponse.code]: false },
      isSubmitFormLoading: { [formSchemaResponse.code]: false },
      submitFormError: {
        [formSchemaResponse.code]: 'Error - Content not loaded.',
      },
    },
  };

  describe('forms selectors', () => {
    describe('isFormSchemaLoading()', () => {
      it('should get the loading status of a given form by code', () => {
        const spy = jest.spyOn(formReducer, 'getFormsIsLoading');
        const expectedResult =
          mockState.forms.isLoading[formSchemaResponse.code];

        expect(
          selectors.isFormSchemaLoading(mockState, formSchemaResponse.code),
        ).toEqual(expectedResult);
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    describe('getFormSchemaError()', () => {
      it('should get the form error property from state filtered by schema code', () => {
        const spy = jest.spyOn(formReducer, 'getFormsError');
        const expectedResult = mockState.forms.error[formSchemaResponse.code];

        expect(
          selectors.getFormSchemaError(mockState, formSchemaResponse.code),
        ).toEqual(expectedResult);
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    describe('getFormSchemaByCode()', () => {
      it('should get a form schema filtered by code', () => {
        const expectedResult = formSchemaResponse.jsonSchema;

        expect(
          selectors.getFormSchemaByCode(mockState, formSchemaResponse.code),
        ).toEqual(expectedResult);
      });
    });

    describe('getFormSchema()', () => {
      let formsResultState;

      beforeEach(() => {
        let sampleSchema = { ...formSchemaResponse };
        sampleSchema.code = 'sample';
        formsResultState = {
          [sampleSchema.code]: sampleSchema,
          [formSchemaResponse.code]: formSchemaResponse,
        };
        mockState.forms.result = formsResultState;
      });

      it('should retrieve all form schemas', () => {
        expect(selectors.getFormSchemas(mockState)).toEqual(formsResultState);
      });
    });
  });

  describe('submitFormSchemaError()', () => {
    it('should get the form error property from state when submitFormFails', () => {
      const spy = jest.spyOn(formReducer, 'getPostFormDataError');
      const expectedResult =
        mockState.forms.submitFormError[formSchemaResponse.code];

      expect(
        selectors.getSubmitFormDataError(mockState, formSchemaResponse.code),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isSubmitFormDataLoading()', () => {
    it('should get the loading status of a given form by code', () => {
      const spy = jest.spyOn(formReducer, 'getPostFormDataIsLoading');
      const expectedResult =
        mockState.forms.isSubmitFormLoading[formSchemaResponse.code];

      expect(
        selectors.isSubmitFormDataLoading(mockState, formSchemaResponse.code),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
