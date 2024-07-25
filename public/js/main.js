const changeValues = document.querySelectorAll('.coin-change');

changeValues.forEach(value => {
    if (parseFloat(value.textContent) > 0) {
        value.classList.add('positive-value');
    } else if (parseFloat(value.textContent) < 0) {
        value.classList.add('negative-value');
    }
});

const prices = document.querySelectorAll('.coin-price');

prices.forEach(price => {
    const decimals = price.textContent.split('.');
    if (decimals.length === 1) {
        price.textContent += '.00';
    } else if (decimals.length === 2 && decimals[1].length === 1) {
        price.textContent += '0';
    }
});

const marketCaps = document.querySelectorAll('.coin-market-cap');

marketCaps.forEach(marketCap => {
    const value = marketCap.textContent.slice(1).replaceAll(',', '');
    console.log(value);
    const length = value.length;
    console.log(length);
    if (length === 13) {
        marketCap.textContent = '$' + value.slice(0, 1) + '.' + value.slice(1, 3) + ' trillion'
    } else if (length >= 10 && length < 13) {
        marketCap.textContent = '$' + value.slice(0, length - 9) + '.' + value.slice(length - 9, length - 7) + ' billion'
    } else if (length >= 7 && length < 10) {
        marketCap.textContent = '$' + value.slice(0, length - 6) + '.' + value.slice(length - 6, length - 4) + ' million'
    }
})