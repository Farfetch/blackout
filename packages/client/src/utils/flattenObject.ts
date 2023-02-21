/* eslint-disable @typescript-eslint/no-explicit-any */
type SourceObject = Record<string, any>;

type Property =
  | string
  | number
  | boolean
  | readonly string[]
  | number[]
  | null
  | undefined;

type FlattenedObject = Record<string, Property>;

export default function flattenObject(
  sourceObj: SourceObject,
): FlattenedObject {
  const result: FlattenedObject = {};

  function iterator(sourceObj: SourceObject, prefix = ''): void {
    for (const key in sourceObj) {
      if (typeof sourceObj[key] === 'object') {
        iterator(sourceObj[key], `${prefix}${key}.`);
        continue;
      }

      result[`${prefix}${key}`] = sourceObj[key];
    }
  }

  iterator(sourceObj);

  return result;
}
