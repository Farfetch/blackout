import { adaptCustomAttributes } from '../index.js';

describe('adaptCustomAttributes()', () => {
  it('should return custom attributes adapted correctly', () => {
    const attributes = '{"foo" : 1 }';

    expect(adaptCustomAttributes(attributes)).toEqual({
      foo: 1,
    });
  });

  it("should return the initial attributes when they aren't adaptable", () => {
    const attributes = '{"foo" : 1, }';

    expect(adaptCustomAttributes(attributes)).toBe(attributes);
  });
});
