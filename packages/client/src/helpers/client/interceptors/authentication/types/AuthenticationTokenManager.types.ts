import type { AuthenticationConfigOptions } from './AuthenticationConfigOptions.types';
import type { AxiosRequestConfig } from 'axios';

interface CurrentRetry {
  currentRetry?: number;
}

export interface RequestConfig
  extends AxiosRequestConfig,
    AuthenticationConfigOptions,
    CurrentRetry {}
