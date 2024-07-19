import express from 'express';
import axios from 'axios';
import 'dotenv/config';

const app = express();
const PORT = 3000;
const API_KEY = process.env.CR_API_KEY;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(API_KEY);
});