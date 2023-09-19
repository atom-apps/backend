
export default function usePrice() {
  const number_format = function (number: number, decimals: number = 0, decimalPoint: string = '.', thousandSeparator: string = ','): string {
    let n = number.toFixed(decimals);
    let x = n.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? decimalPoint + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + thousandSeparator + '$2');
    }
    return x1 + x2;
  }

  const price = (price: number | undefined) => {
    if (!price) {
      return 0.00
    }
    return number_format(price / 100, 2, '.', ',')
  }
  return { price }
}
