import type { Brand } from '../../brands/types';
import type { GenderCode } from '../../types';

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
    gender: GenderCode;
    sizes: {
      position: number;
      code: string;
    }[];
  }[];
}[];
