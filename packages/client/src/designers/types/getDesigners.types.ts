import type { DesignersResponse } from './designers.types';
import type { GetDesignersQuery } from './getDesignersQuery.types';

export type GetDesigners = (
  query: GetDesignersQuery,
  config?: Record<string, unknown>,
) => Promise<DesignersResponse>;
