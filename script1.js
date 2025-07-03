const baseUrl1 = 'http://data.fixer.io/api/latest';
const apiKey1 = 'd965e7b78f483734a97beaaaf2beb208'
const from1 = document.querySelector('#from1');
const to1 = document.querySelector('#to1');
const amount1 = document.querySelector('#amount1');
const btn1 = document.querySelector('#calcBtn1');
const result1 = document.querySelector('.result1');

const errorHandle1 = (err) => {
    result.classList.remove('hidden');
    result.textContent = err.message;
}

const display1 = (res) => {
    result1.classList.remove('hidden');
    result1.innerHTML = `${res}`
}


async function getCurrencies1() {
    try {
        const response = await fetch(`${baseUrl1}?access_key=${apiKey1}`);
        if (!response.ok) throw new Error('Error');
        const data = await response.json();

        const inputTo = to1.value;
        const inputFrom = from1.value;

        const curFrom = Object.entries(data.rates).find(([currency, rate]) =>
            currency.toLowerCase().trim() === inputFrom.toLowerCase());
        if (!curFrom) throw new Error('Error in currency FROM');

        const curTo = Object.entries(data.rates).find(([currency, rate]) =>
            currency.toLowerCase().trim() === inputTo.toLowerCase());
        if (!curTo) throw new Error('Error in currency TO');

        const amountEur = amount1.value / curFrom[1];
        return amountEur * curTo[1];
    } catch (e) {
        errorHandle(e);
        throw new Error(e.message);
    }
}

btn1.onclick = async () => {
    try {
        const res = await getCurrencies1();
        display1(res.toFixed(2));
    } catch (e) {
        errorHandle1(e);
    }
}