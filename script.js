const fromAmountElement = document.querySelector('.amount');
const convertedAmountElement = document.querySelector('.convertedAmount');
const fromCurrencyElement = document.querySelector('.fromCurrency');
const toCurrencyElement = document.querySelector('.toCurrency');
const resultElement = document.querySelector('.result');
const converterContainer = document.querySelector('.converter-container')

const countries = [
  { name: "India", code: "INR" },
  { name: "United States", code: "USD" },
  { name: "United Kingdom", code: "GBP" },
  { name: "European Union", code: "EUR" },
  { name: "Japan", code: "JPY" },
  { name: "Australia", code: "AUD" },
  { name: "Canada", code: "CAD" },
  { name: "Switzerland", code: "CHF" },
  { name: "China", code: "CNY" },
  { name: "Russia", code: "RUB" },
  { name: "Brazil", code: "BRL" },
  { name: "South Africa", code: "ZAR" },
  { name: "Singapore", code: "SGD" },
  { name: "Mexico", code: "MXN" },
  { name: "South Korea", code: "KRW" },
  { name: "Turkey", code: "TRY" },
  { name: "Saudi Arabia", code: "SAR" },
  { name: "UAE", code: "AED" }
];

countries.forEach(country => {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');

    option1.value = option2.value = country.code;
    option1.textContent = option2.textContent = `${country.code} (${country.name})`
    
    fromCurrencyElement.appendChild(option1);
    toCurrencyElement.appendChild(option2);

    fromCurrencyElement.value = "USD";
    toCurrencyElement.value = "INR";
});

const getExchangeRate = async () => {
    const amount = parseFloat(fromAmountElement.value);
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;
    resultElement.textContent = "Fetching Exchange Rates....";
  try {
   const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
   const data = await response.json(); 
   
   const conversionRate = data.rates[toCurrency];
   const convertedAmount = (amount * conversionRate).toFixed(2);

   if(typeof conversionRate === 'undefined'){
    resultElement.textContent = "Exchange Rate data is not available for selected countries";
    convertedAmountElement = "";
   }else{
   convertedAmountElement.value = convertedAmount;
   resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`
   }
  }
 catch (error) {
     converterContainer.innerHTML = `<h2>Error while fetching exchange rates!!!</h2>`;
}
}
fromAmountElement.addEventListener('input', getExchangeRate);
fromCurrencyElement.addEventListener('change', getExchangeRate);
toCurrencyElement.addEventListener('change', getExchangeRate);
window.addEventListener('load', getExchangeRate);