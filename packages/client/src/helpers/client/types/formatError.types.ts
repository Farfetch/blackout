export type DefaultErrorAdapterData = {
  // Error message received.
  message: string | null;
  // Error code received.
  code: number;
  // Developer message received.
  developerMessage: string | null;
  moreInformation: string;
} & { [name: string]: unknown };

export type LegacyErrorAdapterData = {
  // Error message received.
  errorMessage: string;
  // Error code received.
  errorCode: number;
  success: boolean;
} & { [name: string]: unknown };

export type ListErrorData = {
  errors: DefaultErrorAdapterData[];
};

export type MockAxiosConfig = {
  url: string;
  method: string;
  data: string;
  headers: {
    Accept: string;
    'Content-Type': string;
  };
  transformRequest: null[];
  transformResponse: null[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
};

export type Result = {
  config: MockAxiosConfig;
  isAxiosError?: boolean;
  response?: MockAxiosResponse;
  request?: MockAxiosRequest;
};

export type MockAxiosResponse = {
  status: number;
  data:
    | DefaultErrorAdapterData
    | LegacyErrorAdapterData
    | ListErrorData
    | string;
  config: MockAxiosConfig;
};

export type MockAxiosRequest = {
  status: number;
  response: {
    description: string;
  };
};

export type MockAxiosApiErrorData =
  | DefaultErrorAdapterData
  | LegacyErrorAdapterData
  | ListErrorData
  | string
  | Record<string, never>; // when api error has no response, i.e. {}
