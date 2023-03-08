import type { AuthenticationConfigOptions } from './AuthenticationConfigOptions.types.js';
import type { Config } from '../../../../../types/index.js';

interface CurrentRetry {
  currentRetry?: number;
}

export interface RequestConfig
  extends Config,
    AuthenticationConfigOptions,
    CurrentRetry {}
