import type { AxiosRequestConfig } from 'axios';
import type AuthenticationConfigOptions from './AuthenticationConfigOptions.types';

interface CurrentRetry {
  currentRetry?: number;
}

export interface RequestConfig
  extends AxiosRequestConfig,
    AuthenticationConfigOptions,
    CurrentRetry {}
