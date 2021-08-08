const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/add', (req, res) => {
    res.render('add');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/board', (req, res) => {
    res.render('board');
});

router.get('/write', (req, res) => {
    res.render('write');
});

module.exports = router;