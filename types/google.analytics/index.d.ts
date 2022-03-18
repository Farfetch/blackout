declare namespace UniversalAnalytics {
  interface ga {
    loaded: boolean;
    (...args: unknown[]): void;
  }
}

// eslint-disable-next-line no-var
declare var ga: UniversalAnalytics.ga;
