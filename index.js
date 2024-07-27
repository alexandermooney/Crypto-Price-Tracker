import express from 'express';
import axios from 'axios';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from "url";
// import Highcharts from 'highcharts';

const app = express();
const PORT = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_KEY = process.env.CR_API_KEY;
const API_URL = 'https://api.coinranking.com/v2';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());

function significantDigits(number) {
    if (number === 0) {
        return 0; // Handle zero as a special case if needed
    }

    // Calculate the magnitude of the number
    let magnitude = Math.floor(Math.log10(Math.abs(number)));

    // Determine the significant digits based on the magnitude
    let sigDigits;
    if (magnitude >= 1) {
        sigDigits = magnitude + 3;
    } else if (magnitude === 0) {
        sigDigits = 4;
    } else {
        sigDigits = Math.abs(magnitude) + 5;
    }

    return sigDigits;
}

app.get('/', async (req, res) => {
    try {
        const config = {
            headers: {
                'x-access-token': API_KEY,
            },
            params: {
                tiers: 1,
            },
        }
        const result = await axios.get(`${API_URL}/coins`, config);
        const coinList = result.data.data.coins;
        res.render('index', {
            coinList: coinList,
            significantDigits: significantDigits
        });
    } catch (error) {
        console.error(error.message);
        res.render(error.message);
    }
});

app.get('/coin/:uuid', async (req, res) => {
    const config = {
        headers: {
            'x-access-token': API_KEY,
        },
    }
    try {
        const result = await axios.get(`${API_URL}/coin/${req.params.uuid}`, config);
        const coinInfo = result.data.data.coin;

        const priceHistory = await axios.get(`${API_URL}/coin/${req.params.uuid}/history`, {
            headers: {
                'x-access-token': API_KEY,
            },
            params: {
                timePeriod: '5y',
            },
        });

        res.render('coinDetails', {
            coin: coinInfo,
            significantDigits: significantDigits,
            priceHistory: JSON.stringify(priceHistory.data.data.history),
        });
    } catch (error) {
        console.error(error.message);
        res.render(error.message);
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});