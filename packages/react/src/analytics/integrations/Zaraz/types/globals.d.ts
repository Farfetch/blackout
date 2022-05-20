declare global {
  // eslint-disable-next-line no-var
  var zaraz: {
    ecommerce: (data?: unknown) => void;
    track: (data?: unknown) => void;
  };
}

export {};
