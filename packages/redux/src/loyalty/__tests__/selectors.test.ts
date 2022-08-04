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

  describe('getProgramMembership()', () => {
    it('should get the membership from state', () => {
      testEntitySelector(selectors.getProgramMembership, 'memberships');
    });
  });
  describe('getProgramMembershipReplacements()', () => {
    it('should get the replacements from state', () => {
      testEntitySelector(
        selectors.getProgramMembershipReplacements,
        'replacements',
      );
    });
  });
  describe('getProgramMembershipConverts()', () => {
    it('should get the converts from state', () => {
      testEntitySelector(selectors.getProgramMembershipConverts, 'converts');
    });
  });
  describe('getProgramMembershipStatements()', () => {
    it('should get the statements from state', () => {
      testEntitySelector(
        selectors.getProgramMembershipStatements,
        'statements',
      );
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

  describe('areProgramsLoading()', () => {
    it('should get the programs isLoading property', () => {
      testIsLoadingSelector(selectors.areProgramsLoading, 'programs', spy);
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

  describe('getProgramMembershipError()', () => {
    it('should get the membership error property', () => {
      testErrorSelector(selectors.getProgramMembershipError, 'membership', spy);
    });
  });

  describe('isProgramMembershipLoading()', () => {
    it('should get the membership isLoading property', () => {
      testIsLoadingSelector(
        selectors.isProgramMembershipLoading,
        'membership',
        spy,
      );
    });
  });

  describe('getProgramMembershipResult()', () => {
    it('should get the membership result property', () => {
      testResultSelector(
        selectors.getProgramMembershipResult,
        'membership',
        spy,
      );
    });
  });
});

describe('replacements selectors', () => {
  const spy = jest.spyOn(fromReducer, 'getReplacements');

  describe('getProgramMembershipReplacementsError()', () => {
    it('should get the replacements error property', () => {
      testErrorSelector(
        selectors.getProgramMembershipReplacementsError,
        'replacements',
        spy,
      );
    });
  });

  describe('areProgramMembershipReplacementsLoading()', () => {
    it('should get the replacements isLoading property', () => {
      testIsLoadingSelector(
        selectors.areProgramMembershipReplacementsLoading,
        'replacements',
        spy,
      );
    });
  });

  describe('getProgramMembershipReplacementsResult()', () => {
    it('should get the replacements result property', () => {
      testResultSelector(
        selectors.getProgramMembershipReplacementsResult,
        'replacements',
        spy,
      );
    });
  });
});

describe('converts selectors', () => {
  const spy = jest.spyOn(fromReducer, 'getConverts');

  describe('getProgramMembershipConvertsError()', () => {
    it('should get the converts error property', () => {
      testErrorSelector(
        selectors.getProgramMembershipConvertsError,
        'converts',
        spy,
      );
    });
  });

  describe('areProgramMembershipConvertsLoading()', () => {
    it('should get the converts isLoading property', () => {
      testIsLoadingSelector(
        selectors.areProgramMembershipConvertsLoading,
        'converts',
        spy,
      );
    });
  });

  describe('getProgramMembershipConvertsResult()', () => {
    it('should get the converts result property', () => {
      testResultSelector(
        selectors.getProgramMembershipConvertsResult,
        'converts',
        spy,
      );
    });
  });
});

describe('statements selectors', () => {
  const spy = jest.spyOn(fromReducer, 'getStatements');

  describe('getProgramMembershipStatementsError()', () => {
    it('should get the statements error property', () => {
      testErrorSelector(
        selectors.getProgramMembershipStatementsError,
        'statements',
        spy,
      );
    });
  });

  describe('areProgramMembershipStatementsLoading()', () => {
    it('should get the statements isLoading property', () => {
      testIsLoadingSelector(
        selectors.areProgramMembershipStatementsLoading,
        'statements',
        spy,
      );
    });
  });

  describe('getProgramMembershipStatementsResult()', () => {
    it('should get the statements result property', () => {
      testResultSelector(
        selectors.getProgramMembershipStatementsResult,
        'statements',
        spy,
      );
    });
  });
});
