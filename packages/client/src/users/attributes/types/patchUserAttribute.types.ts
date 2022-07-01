import type { Config } from '../../../types';

export type PatchUserAttributeData = {
  op: string;
  path: string;
  value: string;
};

export type PatchUserAttribute = (
  userId: number,
  attributeId: string,
  data: PatchUserAttributeData[],
  config?: Config,
) => Promise<number>;
