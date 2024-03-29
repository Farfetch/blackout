import type { Config } from '../../../types/index.js';
import type { OpPatch } from 'json-patch';

export type PatchUserAttributeData = OpPatch;

export type PatchUserAttribute = (
  userId: number,
  attributeId: string,
  data: PatchUserAttributeData[],
  config?: Config,
) => Promise<number>;
