import type { Brand } from '../../brands/types';
import type { GenderString } from '../../types';

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
    gender: GenderString;
    sizes: {
      position: number;
      code: string;
    }[];
  }[];
}[];
