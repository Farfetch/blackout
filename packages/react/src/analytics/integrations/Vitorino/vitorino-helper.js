import { ENVIRONMENT_TYPES } from './constants';

export const getEnvironmentFromOptions = options => {
  const { environment } = options;
  const safeEnvironment =
    environment || window?.__BUILD_CONTEXT__?.env?.NODE_ENV;

  return safeEnvironment === ENVIRONMENT_TYPES.prod
    ? window.Vitorino.Environment.PRODUCTION
    : window.Vitorino.Environment.SANDBOX;
};
