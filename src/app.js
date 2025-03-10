const express = require('express');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
require('../config/passport'); // Configura Passport

const app = express();

// Middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Rotte
app.get('/', (req, res) => res.render('index', { user: req.user }));
app.get('/login', (req, res) => res.render('login'));
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => res.redirect('/')
);
app.get('/logout', (req, res) => {
    req.logout(() => res.redirect('/'));
});

// Avvio server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server in ascolto su http://localhost:${PORT}`));

