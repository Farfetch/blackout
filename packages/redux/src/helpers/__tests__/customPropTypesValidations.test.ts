import { idWithLabelValidation } from '../customPropTypeValidations';

describe('props validation', () => {
  describe('id', () => {
    it('should return an error if `labelContent` is not provided', () => {
      const expectedError = new Error(
        '`id` is required when provided a `labelContent` to `Component`.',
      );
      const props = {
        labelContent: 'This is the label',
      };
      const propsName = 'id';
      const componentName = 'Component';
      const validationResult = idWithLabelValidation(
        props,
        propsName,
        componentName,
      );

      expect(validationResult).toEqual(expectedError);
    });

    it('should return an error if type is not `string`', () => {
      const expectedError = new Error(
        'Invalid prop `id` of type `number` supplied to `Component`, expected `string`.',
      );
      const props = {
        labelContent: 'This is the label',
        id: 17,
      };
      const propsName = 'id';
      const componentName = 'Component';
      const validationResult = idWithLabelValidation(
        props,
        propsName,
        componentName,
      );

      expect(validationResult).toEqual(expectedError);
    });

    it('should return no error if type is `string` and `labelContent is provided', () => {
      const props = {
        labelContent: 'This is the label',
        id: 'awesomeId',
      };
      const propsName = 'id';
      const componentName = 'Component';
      const validationResult = idWithLabelValidation(
        props,
        propsName,
        componentName,
      );

      expect(validationResult).toBeUndefined();
    });
  });
});
