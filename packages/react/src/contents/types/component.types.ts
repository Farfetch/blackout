import type { ComponentType } from '@farfetch/blackout-client';
import type { DefaultMedia } from './base.types';

export interface ComponentProps {
  component: ComponentType;
  location: {
    query?: Record<string, string>;
  };
  viewportBreakpoint: string;
  media?: DefaultMedia;
  children?: React.ReactNode;
}

export interface ComponentsList {
  data: {
    components: Array<ComponentType>;
  };
  location: {
    query?: Record<string, string>;
  };
  viewportBreakpoint: string;
}
