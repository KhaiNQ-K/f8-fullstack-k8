export const convertCurrency = (money) => {
  return (
    money &&
    money.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    })
  );
};
