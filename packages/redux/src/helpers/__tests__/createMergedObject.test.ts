import {
  expectedResult,
  source,
  target,
} from '../__fixtures__/createMergedObject.fixtures';
import createMergedObject from '../createMergedObject';
import isPlainObject from 'lodash/isPlainObject';

/**
 * Test deep references of mergedObject to ensure that only the props that came
 * from the sourceObject get new references and that the props that did not keep
 * the same references from target. This method uses jest's expect methods to make
 * assertions to the mergedObject.
 *
 * @param mergedObject - Final result object of merging target with source.
 * @param target       - Target object of the merge operation.
 * @param source       - Source object with the props to merge into target.
 */
function testMergedObjectDeepReferences(
  mergedObject: Record<string, unknown>,
  target: Record<string, unknown>,
  source: Record<string, unknown>,
) {
  Object.keys(mergedObject).forEach(prop => {
    const sourceValue = source[prop];
    const targetValue = target ? target[prop] : undefined;
    const mergedObjectValue = mergedObject[prop];
    const isPropInTarget = prop in target;
    const isPropInSource = prop in source;

    // If prop is in source and not in target, the value of mergedObject[prop]
    // will be equal to source[prop]
    if (isPropInSource && !isPropInTarget && isPlainObject(sourceValue)) {
      expect(mergedObjectValue === sourceValue).toBe(true);
    }

    // If prop is both in source and target and both values are of object type,
    // then we expect to get a new reference for mergedObject[prop] that must
    // contain source[prop]
    if (
      isPropInSource &&
      isPropInTarget &&
      isPlainObject(sourceValue) &&
      isPlainObject(targetValue)
    ) {
      expect(mergedObjectValue !== targetValue).toBe(true);
      expect(mergedObjectValue !== sourceValue).toBe(true);
    }

    // If prop is only in target and not in source we expect
    // that mergedObject[prop] be exactly equal to target[prop]
    if (isPropInTarget && !isPropInSource) {
      expect(mergedObjectValue === targetValue).toBe(true);
    }

    // If both target and source values for this prop are objects,
    // recurse into it to check for inner references changes.
    if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
      testMergedObjectDeepReferences(
        mergedObjectValue as Record<string, unknown>,
        targetValue as Record<string, unknown>,
        sourceValue as Record<string, unknown>,
      );
    }
  });
}

describe('createMergedObject()', () => {
  describe('merge with defined target', () => {
    const mergedObject = createMergedObject(target, source);

    it('Should create a new object that is the result of merging source into target', () => {
      expect(mergedObject).toEqual(expectedResult);

      expect(mergedObject === target).toBe(false);

      testMergedObjectDeepReferences(mergedObject, target, source);
    });

    it('Should create new refs for all source properties on the merged object', () => {
      expect(mergedObject.products === target.products).toBe(false);
    });

    it('Should maintain refs to target props that are not present on source', () => {
      expect(mergedObject.preferences === target.preferences).toBe(true);
    });
  });

  describe('merge without target', () => {
    const mergedObject = createMergedObject(null, source);

    it('Should return a new object that contains same properties as source', () => {
      expect(mergedObject).toEqual(source);
    });
  });
});
