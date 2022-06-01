export type DefaultErrorAdapterData = {
  // Error message received.
  message: string;
  // Error code received.
  code: number;
  // Developer message received.
  developerMessage: string;
} & { [name: string]: unknown };

export type LegacyErrorAdapterData = {
  // Error message received.
  errorMessage: string;
  // Error code received.
  errorCode: number;
} & { [name: string]: unknown };
