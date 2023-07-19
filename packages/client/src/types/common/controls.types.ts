import type { HypermediaLink } from './hypermediaLink.types.js';

export type Controls = {
  '@controls'?: {
    [key: string]: HypermediaLink;
  };
};
