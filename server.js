const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'snake_game'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

app.post('/save-score', (req, res) => {
    const { playerName, score } = req.body;
    const sql = 'INSERT INTO scores (player_name, score) VALUES (?, ?)';
    db.query(sql, [playerName, score], (err, result) => {
        if (err) throw err;
        res.json({ status: 'Score saved' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
