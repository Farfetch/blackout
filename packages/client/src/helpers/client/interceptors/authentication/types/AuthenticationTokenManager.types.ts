import type { AuthenticationConfigOptions } from './AuthenticationConfigOptions.types';
import type { Config } from '../../../../../types';

interface CurrentRetry {
  currentRetry?: number;
}

export interface RequestConfig
  extends Config,
    AuthenticationConfigOptions,
    CurrentRetry {}
