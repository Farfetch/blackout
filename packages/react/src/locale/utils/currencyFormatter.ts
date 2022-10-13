const currencyFormatter = (
  localeCode: string,
  currencyCode: string,
  options: Intl.NumberFormatOptions = {},
) => {
  if (typeof Intl !== 'object' || typeof Intl.NumberFormat !== 'function') {
    return (value: number) => value;
  }

  return (value: number, showCurrency = true) => {
    const opts = {
      ...options,
      currency: currencyCode,
      style: showCurrency ? options.style : 'decimal',
    };

    return new Intl.NumberFormat(localeCode, opts).format(value);
  };
};

export default currencyFormatter;
