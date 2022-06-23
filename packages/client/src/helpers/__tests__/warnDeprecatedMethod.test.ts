import warnDeprecatedMethod from '../warnDeprecatedMethod';

describe('warnDeprecatedMethod()', () => {
  const spy = jest.fn();
  const mockPackageInfo = '@farfetch/orange@0.0.0';
  const mockDeprecatedMethod = 'deprecatedFoo';
  const mockNewMethod = 'newFoo';

  console.warn = spy;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should warn a deprecated method with the newMethod option successfully', () => {
    warnDeprecatedMethod(mockPackageInfo, mockDeprecatedMethod, mockNewMethod);

    expect(spy.mock.calls[0][0]).toMatchInlineSnapshot(
      '"@farfetch/orange@0.0.0: DEPRECATED method \\"deprecatedFoo\\". Please use \\"newFoo\\" instead. This method will be removed in the next major release."',
    );
  });

  it('should warn a deprecated method without the newMethod option successfully', () => {
    warnDeprecatedMethod(mockPackageInfo, mockDeprecatedMethod);

    expect(spy.mock.calls[0][0]).toMatchInlineSnapshot(
      '"@farfetch/orange@0.0.0: DEPRECATED method \\"deprecatedFoo\\". This method will be removed in the next major release."',
    );
  });
});
