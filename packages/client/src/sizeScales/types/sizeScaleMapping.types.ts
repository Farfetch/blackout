import type { Brand } from '../../brands/types';
import type { GenderDescription } from '../../types';

export type SizeScaleMapping = {
  scales: {
    id: number;
    name: string;
    country: {
      alpha2Code: string;
    };
    brand: {
      id: Brand['id'];
    };
    gender: GenderDescription;
    sizes: {
      position: number;
      code: string;
    }[];
  }[];
}[];
