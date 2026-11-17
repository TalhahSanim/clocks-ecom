// 87.9 -> 87.90
const priceFormatter = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" });
export const  formatPrice = (number) => priceFormatter.format(number)