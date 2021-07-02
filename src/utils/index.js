export const formatCurrency = (value) => {
  const number = Number(value);

  return new Intl.NumberFormat("pl", { style: "currency", currency: "PLN" }).format(number);
};

export const formatDate = (string) => {
  console.log(typeof string);
  const date = new Date(string);

  return new Intl.DateTimeFormat("pl").format(date);
};
