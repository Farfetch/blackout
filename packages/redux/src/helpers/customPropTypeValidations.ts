/**
 * Validation for the `id` prop, it is required if `labelContent` is provided and
 * should have 'string' as type.
 *
 * @param props         - Component props.
 * @param propName      - Name of the prop being validated.
 * @param componentName - Component name.
 *
 * @returns - When the props is valid, nothing is returned.
 */
export const idWithLabelValidation = (
  props: Record<string, unknown>,
  propName: string,
  componentName: string,
): Error | undefined => {
  return conditionalRequiredAndType(
    'labelContent',
    'string',
    props,
    propName,
    componentName,
  );
};

/**
 * Validates if the given prop exists when `neededProp` is provided and ensures it
 * has `propType` type,.
 *
 * @param neededProp    - Prop name that makes the validated prop required.
 * @param propType      - Validated prop type.
 * @param props         - Component props.
 * @param propName      - Name of the prop being validated.
 * @param componentName - Component name.
 *
 * @returns - When the props is valid, nothing is returned.
 */
const conditionalRequiredAndType = (
  neededProp: string,
  propType: string,
  props: Record<string, unknown>,
  propName: string,
  componentName: string,
): Error | undefined => {
  const typeOfProp = typeof props[propName];

  // Make it required if `neededProp` is provided
  if (props[neededProp] !== undefined && props[propName] === undefined) {
    return new Error(
      `\`${propName}\` is required when provided a \`labelContent\` to \`${componentName}\`.`,
    );
  }

  // Ensure it's a string
  if (props[propName] !== undefined && typeOfProp !== propType) {
    return new Error(
      `Invalid prop \`${propName}\` of type \`${typeOfProp}\` supplied to \`${componentName}\`, expected \`string\`.`,
    );
  }
};
