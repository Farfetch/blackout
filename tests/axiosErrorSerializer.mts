import axios from 'axios';

const axiosSpecificProperties = [
  'response',
  'request',
  'config',
  'isAxiosError',
];

// This is a serializer for error snapshots that will mimic the previous behaviour
// when adaptError function was returning plain objects instead of axios errors. This is to
// avoid having the snapshots ending up containing axios specific properties that are not relevant for the
// test itself.
module.exports = {
  serialize(
    val: any,
    config: any,
    indentation: string,
    depth: number,
    refs: any,
    printer: any,
  ) {
    const finalVal: Record<string, string> = {
      message: val.message,
    };

    Object.keys(val).forEach(key => {
      if (!axiosSpecificProperties.includes(key)) {
        finalVal[key] = val[key];
      }
    });

    // We need to remove our plugin to avoid
    // recursive calls to this serialize function.
    // Not sure why this is necessary though as the
    // example on jest documentation does the same thing.
    const { plugins } = config;
    const filteredPlugins = plugins.filter((plugin: any) => this !== plugin);

    return printer(
      finalVal,
      { ...config, plugins: filteredPlugins },
      indentation,
      depth,
      refs,
      printer,
    );
  },

  test(val: unknown) {
    return val && typeof val === 'object' && axios.isAxiosError(val);
  },
};
