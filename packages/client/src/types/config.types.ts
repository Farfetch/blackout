import type { AxiosRequestConfig } from 'axios';

export type MockServerHeaders = {
  'X-Mock-Server-Ignore'?: boolean;
};

export type CustomBlackoutClientAxiosRequestConfig = AxiosRequestConfig & {
  headers?: MockServerHeaders;
};

export type Config = CustomBlackoutClientAxiosRequestConfig &
  Record<string, unknown>;
