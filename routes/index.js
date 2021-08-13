const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});
router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/join', (req, res) => {
    res.render('join');
});

module.exports = router;