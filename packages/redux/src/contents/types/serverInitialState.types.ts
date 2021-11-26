import type { ContentsEntity } from '../../entities/types';
import type { State } from './reducers.types';

type ContentsResult = {
  searchResults: {
    [k: string]: {
      result: string[];
    };
  };
};

export type ServerInitialState = {
  entities?: Partial<{
    contents: Record<string, ContentsEntity>;
  }>;
  contents?: State | ContentsResult;
};
