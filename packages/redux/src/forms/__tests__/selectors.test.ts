import * as formReducer from '../reducer';
import * as selectors from '../selectors';
import { formSchemaResponse, mockState } from 'tests/__fixtures__/forms';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('contents redux selectors', () => {
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

    describe('getFormSchemas()', () => {
      let formsResultState;

      beforeEach(() => {
        const sampleSchema = { ...formSchemaResponse };
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
      const spy = jest.spyOn(formReducer, 'getSubmitFormDataError');
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
      const spy = jest.spyOn(formReducer, 'getSubmitFormDataIsLoading');
      const expectedResult =
        mockState.forms.isSubmitFormLoading[formSchemaResponse.code];

      expect(
        selectors.isSubmitFormDataLoading(mockState, formSchemaResponse.code),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
