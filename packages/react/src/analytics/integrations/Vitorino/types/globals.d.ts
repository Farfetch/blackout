interface Window {
  Vitorino: {
    PageTypes: Record<string, string>;
    Environment: {
      PRODUCTION: string;
      SANDBOX: string;
    };
    track: (config: object | null) => (page: string | undefined) => void;
  };
  __BUILD_CONTEXT__: {
    env: {
      NODE_ENV: string;
    };
  };
}
