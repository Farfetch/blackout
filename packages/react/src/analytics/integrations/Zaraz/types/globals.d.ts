declare global {
  // eslint-disable-next-line no-var
  var zaraz: {
    ecommerce: (eventName: string, data?: unknown) => void;
    track: (eventName: string, data?: unknown) => void;
  };
}

export {};
