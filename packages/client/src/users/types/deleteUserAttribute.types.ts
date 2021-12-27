import type { Config } from '../../types';

export type DeleteUserAttribute = (
  id: number,
  attributeId: string,
  config?: Config,
) => Promise<number>;
