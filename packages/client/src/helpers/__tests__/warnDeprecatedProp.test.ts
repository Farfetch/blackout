import warnDeprecatedProp from '../warnDeprecatedProp';

describe('warnDeprecatedProp()', () => {
  const spy = jest.fn();

  console.warn = spy;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should warn a deprecated prop successfully', () => {
    const mockPackageInfo = '@bw/utils@0.0.0';
    const mockComponentName = 'Component';
    const mockDeprecatedProp = 'deprecatedProp';
    const mockNewProp = 'newProp';

    warnDeprecatedProp(
      mockPackageInfo,
      mockComponentName,
      mockDeprecatedProp,
      mockNewProp,
    );

    expect(spy.mock.calls[0][0]).toMatchInlineSnapshot(
      "\"@bw/utils@0.0.0: The prop 'deprecatedProp' has been deprecated on `Component`. Please use 'newProp' instead.\"",
    );
  });
});
