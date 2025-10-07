type typeOrder = 'sell' | 'buy';

export const ordersSort = ({
  orders,
  type,
}: {
  orders: any[];
  type: typeOrder;
}) => {
  const book = orders.reduce((pr, cr) => {
    if (pr[cr.price]) {
      pr[cr.price] += cr.amount - cr?.filled_qty || 0;
    } else {
      pr[cr.price] = cr.amount - cr?.filled_qty || 0;
    }
    return {...pr};
  }, {});
  const bookKeys = Object.keys(book)
    .sort((a: any, b: any) => {
      if (type === 'sell') {
        return +a - +b;
      }
      return +b - +a;
    })
    .slice(0, 9);
  return bookKeys.map(key => ({price: key, amount: book[key]}));
};

export const changePricePerCent = ({close, open}) => {
  return Math.round((((close - open) * 100) / open) * 100) / 100;
};

export const getStableCoinPairs = (stableCoinObject: object) => {
  const arr = Object.entries(stableCoinObject) || [];
  const pairs = arr.map((el: Array<any>) =>
    el[1]?.map((secondCurr: string) => `${el[0]}-${secondCurr}`),
  );
  return pairs.flat();
};
