const apiKey = "54219910d342a97362c131df";
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

let previousRate = null;

// Load currency list
async function loadCurrencies() {
  const res = await fetch(url);
  const data = await res.json();
  const currencies = Object.keys(data.conversion_rates);

  const from = document.getElementById("fromCurrency");
  const to = document.getElementById("toCurrency");

  currencies.forEach(currency => {
    from.innerHTML += `<option value="${currency}">${currency}</option>`;
    to.innerHTML += `<option value="${currency}">${currency}</option>`;
  });

  from.value = "USD";
  to.value = "INR";
}

loadCurrencies();

// Convert function
async function convert() {
  const amount = document.getElementById("amount").value;
  const from = document.getElementById("fromCurrency").value;
  const to = document.getElementById("toCurrency").value;

  const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`);
  const data = await res.json();

  const rate = data.conversion_rates[to];
  const result = amount * rate;

  document.getElementById("result").innerText =
    `${amount} ${from} = ${result.toFixed(2)} ${to}`;

  showTrend(rate);
}

// Trend + Alert logic
function showTrend(currentRate) {
  const trendEl = document.getElementById("trend");
  const alertEl = document.getElementById("alertBox");

  if (previousRate !== null) {
    if (currentRate > previousRate) {
      trendEl.innerText = "📈 Rate is increasing";
      alertEl.innerText = "⚠️ Alert: Rate went UP!";
    } else if (currentRate < previousRate) {
      trendEl.innerText = "📉 Rate is decreasing";
      alertEl.innerText = "⚠️ Alert: Rate went DOWN!";
    } else {
      trendEl.innerText = "➡️ No change";
      alertEl.innerText = "";
    }
  }

  previousRate = currentRate;
}
