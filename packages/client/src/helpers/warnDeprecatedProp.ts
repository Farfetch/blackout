/**
 * Throws a warning message informing that a deprecated prop is being used and what
 * should be used instead.
 *
 * @param packageInfo    - Info of the package where the deprecated prop is being used. Recommended to
 *                         use `packageName@packageVersion` from package.json (for example
 *                         "\@farfetch/blackout-redux\@1.0.0").
 * @param componentName  - The component where the deprecated prop is being used. Suggested to use it
 *                         between angle bracket ("\<\>") when it's a UI component (for example
 *                         "<Component>").
 * @param deprecatedProp - Name of the deprecated prop.
 * @param newProp        - Name of the prop to use instead of the deprecated one.
 */
const warnDeprecatedProp = (
  packageInfo: string,
  componentName: string,
  deprecatedProp: string,
  newProp: string,
): void => {
  /* eslint-disable-next-line no-console */
  newProp
    ? console.warn(
        `${packageInfo}: The prop '${deprecatedProp}' has been deprecated on \`${componentName}\`. Please use '${newProp}' instead.`,
      )
    : console.warn(
        `${packageInfo}: The prop '${deprecatedProp}' has been deprecated on \`${componentName}\`.`,
      );
};

export default warnDeprecatedProp;
