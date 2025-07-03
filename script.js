const baseUrl = 'http://data.fixer.io/api/latest';
const apiKey = 'd965e7b78f483734a97beaaaf2beb208'
const from = document.querySelector('#from');
const to = document.querySelector('#to');
const amount = document.querySelector('#amount');
const btn = document.querySelector('#calcBtn');
const result = document.querySelector('.result');

const errorHandle = (err) => {
    result.classList.remove('hidden');
    result.textContent = err.message;
}

const display = (res) => {
    result.classList.remove('hidden');
    result.innerHTML = `${amount.value} ${from.value} = ${res} ${to.value}`;
}


async function getCurrencies() {
    try {
        const response = await fetch(`${baseUrl}?access_key=${apiKey}`);
        if (!response.ok) throw new Error('Error');
        const data = await response.json();

        const inputTo = to.value.trim();
        const inputFrom = from.value.trim();

        const curFrom = Object.entries(data.rates).find(([currency, rate]) =>
            currency.toLowerCase().trim() === inputFrom.toLowerCase());
        if (!curFrom) throw new Error('Error in currency FROM');

        const curTo = Object.entries(data.rates).find(([currency, rate]) =>
            currency.toLowerCase().trim() === inputTo.toLowerCase());
        if (!curTo) throw new Error('Error in currency TO');

        const amountEur = amount.value / curFrom[1];
        return amountEur * curTo[1];
    } catch (e) {
        errorHandle(e);
        throw new Error(e.message);
    }
}

btn.onclick = async () => {
    try {
        const res = await getCurrencies();
        display(res.toFixed(2));
    } catch (e) {
        errorHandle(e);
    }
}