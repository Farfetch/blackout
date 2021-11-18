/**
 * Throws a warning message informing that a deprecated method is being used and what should be used instead.
 *
 * @param {string} packageInfo - Info of the package where the deprecated method is being used.
 * @param {string} deprecatedMethod - Name of the deprecated method.
 * @param {string} newMethod - Name of the method to use instead of the deprecated one.
 *
 */
export default (packageInfo, deprecatedMethod, newMethod) => {
  let message = `${packageInfo}: DEPRECATED method "${deprecatedMethod}".`;

  if (newMethod) {
    message += ` Please use "${newMethod}" instead.`;
  }

  message += ' This method will be removed in the next major release.';

  /* eslint-disable-next-line no-console */
  console.warn(message);
};
