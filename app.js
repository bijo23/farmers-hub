// Import necessary modules
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Set up SQLite database
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to database', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Create a sample table if not exists
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    farm_type TEXT NOT NULL
)`, (err) => {
    if (err) {
        console.error('Error creating table', err);
    } else {
        console.log('Users table is ready');
    }
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    var {success, msg} = req.query;
    if (success != undefined) success = (success == "true" || success == true);
    
    res.render('index', { title: 'Home', success: success, msg: msg });
});

app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Database error');
        } else {
            res.render('users', { title: 'Users', users: rows });
        }
    });
});

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    db.all(`SELECT * FROM users where email = $1 and password = $2`, [email, password], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Database error');
            res.redirect('/?success=false&msg=INVALID USERNAME or PASSWORD');
        } else {
            if (rows.length == 0) return res.redirect('/?success=false&msg=INVALID USERNAME or PASSWORD');
            res.redirect('/?success=true&msg=LOGIN SUCCESSFULL');
        }
    });
});

app.post('/users', (req, res) => {
    const {name, email, phone, password, farm_type} = req.body;
    db.all(`INSERT INTO users
    (id, name, email, phone, password, farm_type)
    VALUES((select count(id) from users), $1, $2, $3, $4, $5);`, [name, email, phone, password, farm_type], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Database error');
        } else {
            res.redirect('/');
        }
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
