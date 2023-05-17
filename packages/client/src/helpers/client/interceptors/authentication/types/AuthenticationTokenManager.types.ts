import type { AuthenticationConfig } from './AuthenticationConfig.types.js';
import type { Config } from '../../../../../types/index.js';

interface CurrentRetry {
  currentRetry?: number;
}

export interface RequestConfig
  extends Config,
    AuthenticationConfig,
    CurrentRetry {}
