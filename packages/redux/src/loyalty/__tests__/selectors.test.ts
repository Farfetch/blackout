import * as fromEntities from '../../entities/selectors/entity';
import * as fromReducer from '../reducer';
import * as selectors from '../selectors';
import { mockState } from 'tests/__fixtures__/loyalty';

const testEntitySelector = (selector: (n: any) => unknown, subArea: string) => {
  const spy = jest.spyOn(fromEntities, 'getEntities');
  expect(selector(mockState)).toEqual(
    mockState.entities[subArea as keyof typeof mockState.entities],
  );
  expect(spy).toHaveBeenCalledWith(mockState, subArea);
};
const testErrorSelector = (
  selector: (n: any) => unknown,
  subArea: string,
  spy: jest.SpyInstance,
) => {
  const expectedResult =
    mockState.loyalty[subArea as keyof typeof mockState.loyalty].error;
  expect(selector(mockState)).toEqual(expectedResult);
  expect(spy).toHaveBeenCalledTimes(1);
};
const testIsLoadingSelector = (
  selector: (n: any) => unknown,
  subArea: string,
  spy: jest.SpyInstance,
) => {
  const expectedResult =
    mockState.loyalty[subArea as keyof typeof mockState.loyalty].isLoading;
  expect(selector(mockState)).toEqual(expectedResult);
  expect(spy).toHaveBeenCalledTimes(1);
};
const testResultSelector = (
  selector: (n: any) => unknown,
  subArea: string,
  spy: jest.SpyInstance,
) => {
  const expectedResult =
    mockState.loyalty[subArea as keyof typeof mockState.loyalty].result;
  expect(selector(mockState)).toEqual(expectedResult);
  expect(spy).toHaveBeenCalledTimes(1);
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('entity selectors', () => {
  describe('getPrograms()', () => {
    it('should get the programs from state', () => {
      testEntitySelector(selectors.getPrograms, 'programs');
    });
  });

  describe('getMembership()', () => {
    it('should get the membership from state', () => {
      testEntitySelector(selectors.getMembership, 'membership');
    });
  });
  describe('getReplacements()', () => {
    it('should get the replacements from state', () => {
      testEntitySelector(selectors.getReplacements, 'replacements');
    });
  });
  describe('getConverts()', () => {
    it('should get the converts from state', () => {
      testEntitySelector(selectors.getConverts, 'converts');
    });
  });
  describe('getStatements()', () => {
    it('should get the statements from state', () => {
      testEntitySelector(selectors.getStatements, 'statements');
    });
  });
});

describe('programs selectors', () => {
  const spy = jest.spyOn(fromReducer, 'getPrograms');

  describe('getProgramsError()', () => {
    it('should get the programs error property', () => {
      testErrorSelector(selectors.getProgramsError, 'programs', spy);
    });
  });

  describe('isProgramsLoading()', () => {
    it('should get the programs isLoading property', () => {
      testIsLoadingSelector(selectors.isProgramsLoading, 'programs', spy);
    });
  });

  describe('getProgramsResult()', () => {
    it('should get the programs result property', () => {
      testResultSelector(selectors.getProgramsResult, 'programs', spy);
    });
  });
});

describe('membership selectors', () => {
  const spy = jest.spyOn(fromReducer, 'getMembership');

  describe('getMembershipError()', () => {
    it('should get the membership error property', () => {
      testErrorSelector(selectors.getMembershipError, 'membership', spy);
    });
  });

  describe('isMembershipLoading()', () => {
    it('should get the membership isLoading property', () => {
      testIsLoadingSelector(selectors.isMembershipLoading, 'membership', spy);
    });
  });

  describe('getMembershipResult()', () => {
    it('should get the membership result property', () => {
      testResultSelector(selectors.getMembershipResult, 'membership', spy);
    });
  });
});

describe('replacements selectors', () => {
  const spy = jest.spyOn(fromReducer, 'getReplacements');

  describe('getReplacementsError()', () => {
    it('should get the replacements error property', () => {
      testErrorSelector(selectors.getReplacementsError, 'replacements', spy);
    });
  });

  describe('isReplacementsLoading()', () => {
    it('should get the replacements isLoading property', () => {
      testIsLoadingSelector(
        selectors.isReplacementsLoading,
        'replacements',
        spy,
      );
    });
  });

  describe('getReplacementsResult()', () => {
    it('should get the replacements result property', () => {
      testResultSelector(selectors.getReplacementsResult, 'replacements', spy);
    });
  });
});

describe('converts selectors', () => {
  const spy = jest.spyOn(fromReducer, 'getConverts');

  describe('getConvertsError()', () => {
    it('should get the converts error property', () => {
      testErrorSelector(selectors.getConvertsError, 'converts', spy);
    });
  });

  describe('isConvertsLoading()', () => {
    it('should get the converts isLoading property', () => {
      testIsLoadingSelector(selectors.isConvertsLoading, 'converts', spy);
    });
  });

  describe('getConvertsResult()', () => {
    it('should get the converts result property', () => {
      testResultSelector(selectors.getConvertsResult, 'converts', spy);
    });
  });
});

describe('statements selectors', () => {
  const spy = jest.spyOn(fromReducer, 'getStatements');

  describe('getStatementsError()', () => {
    it('should get the statements error property', () => {
      testErrorSelector(selectors.getStatementsError, 'statements', spy);
    });
  });

  describe('isStatementsLoading()', () => {
    it('should get the statements isLoading property', () => {
      testIsLoadingSelector(selectors.isStatementsLoading, 'statements', spy);
    });
  });

  describe('getStatementsResult()', () => {
    it('should get the statements result property', () => {
      testResultSelector(selectors.getStatementsResult, 'statements', spy);
    });
  });
});