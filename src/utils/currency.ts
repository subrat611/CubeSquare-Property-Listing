export const formatCurrency = (
  value: number,
  currencyCode: string = "AED",
  locale: string = "en-AE",
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(value);
};
