export const formatCurrency = (value) => {
  return value
    ? new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(value)
    : '0 đ';
};
