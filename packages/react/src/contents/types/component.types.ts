import type { ComponentType } from '@farfetch/blackout-client';
import type { DefaultMedia } from './base.types.js';

export type ComponentProps = {
  component: ComponentType;
  location?: {
    query?: Record<string, string>;
  };
  viewportBreakpoint?: string;
  media?: DefaultMedia;
  children?: React.ReactNode;
};

export type ComponentList = {
  data: {
    components: Array<ComponentType>;
  };
  location: {
    query?: Record<string, string>;
  };
  viewportBreakpoint: string;
};
