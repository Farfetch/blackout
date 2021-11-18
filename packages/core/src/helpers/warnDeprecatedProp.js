/**
 * Throws a warning message informing that a deprecated prop is being used and what should be used instead.
 *
 * @param {string} packageInfo - Info of the package where the deprecated prop is being used.
 *                               Recommended to use `packageName@packageVersion` from package.json (for example "@bw/utils@0.15.0").
 * @param {string} componentName - The component where the deprecated prop is being used.
 *                                 Suggested to use it between angle bracket ("<>") when it's a UI component (for example "<Component>").
 * @param {string} deprecatedProp - Name of the deprecated prop.
 * @param {string} newProp - Name of the prop to use instead of the deprecated one.
 *
 */
export default (packageInfo, componentName, deprecatedProp, newProp) => {
  /* eslint-disable-next-line no-console */
  newProp
    ? console.warn(
        `${packageInfo}: The prop '${deprecatedProp}' has been deprecated on \`${componentName}\`. Please use '${newProp}' instead.`,
      )
    : console.warn(
        `${packageInfo}: The prop '${deprecatedProp}' has been deprecated on \`${componentName}\`.`,
      );
};
