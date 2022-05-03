declare namespace GoogleAnalytics {
  interface gtag {
    (...args: unknown[]): void;
  }
}

// eslint-disable-next-line no-var
declare var gtag: GoogleAnalytics.gtag;
