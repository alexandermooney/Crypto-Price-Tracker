const chartContainer = document.getElementById('chartContainer');
const uuid = chartContainer.getAttribute('data-uuid');
const coinName = chartContainer.getAttribute('data-name');
const priceHistory = JSON.parse(chartContainer.getAttribute('data-priceHistory'));
const priceHistoryArr = [];

for (let i = 0; i < priceHistory.length; i++) {
    const dataPoint = [];
    dataPoint.push(priceHistory[i].timestamp * 1000);
    dataPoint.push(parseFloat(priceHistory[i].price));
    priceHistoryArr.unshift(dataPoint);
}

console.log(priceHistoryArr);

(async () => {
   Highcharts.stockChart('chartContainer', {
    rangeSelector: {
        selected: 4,
        buttonTheme: {
            states: {
                hover: {
                    fill: "rgba(255,130,37, 0.5)"
                },
                select: {
                    fill: "rgba(255,130,37, 0.25)",
                }
            }
        }
    },
    
    title: {
        text: `${coinName} Price`
    },

    navigator: {
        maskFill: "rgba(255,130,37, 0.25)",
    },

    series: [{
        name: `${coinName} Price`,
        data: priceHistoryArr,
        type: 'areaspline',
        threshold: null,
        tooltip: {
            valueDecimals: 2,
        },
        color: '#FF8225',
        fillColor: {
            linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
            },
            stops: [
                [0, '#FF8225'],
                [
                    1,
                    'rgba(255, 130, 37, 0)'
                ]
            ]
        }
    }],
}) 
})();