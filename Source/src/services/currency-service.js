export default class CurrencyService {
  getCurrenPrices() {
    return fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
  };
}

