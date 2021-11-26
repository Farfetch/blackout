/**
 * Throws a warning message informing that a deprecated method is being used and what should be used instead.
 *
 * @memberof module:helpers
 *
 * @param {string} packageInfo - Info of the package where the deprecated method is being used. Recommended to use `packageName@packageVersion` from package.json (for example "@farfetch/blackout-redux@1.0.0").
 * @param {string} deprecatedMethod - Name of the deprecated method.
 * @param {string} newMethod - Name of the method to use instead of the deprecated one.
 *
 */
const warnDeprecatedMethod = (
  packageInfo: string,
  deprecatedMethod: string,
  newMethod: string,
): void => {
  let message = `${packageInfo}: DEPRECATED method "${deprecatedMethod}".`;

  if (newMethod) {
    message += ` Please use "${newMethod}" instead.`;
  }

  message += ' This method will be removed in the next major release.';

  /* eslint-disable-next-line no-console */
  console.warn(message);
};

export default warnDeprecatedMethod;
