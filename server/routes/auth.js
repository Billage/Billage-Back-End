const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res, next) => {
    const { user_id, password, nick, address } = req.body;
    try {
        const ex_id = await User.findOne({ where: { user_id } });
        if (ex_id) {
            return res.redirect('/register?id_error=exist');
        }
        const ex_nick = await User.findOne({ where: { nick } });
        if (ex_nick) {
            return res.redirect('/register?nick_error=exist');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            user_id,
            password: hash,
            nick,
            address,
        });
        return res.redirect('/');
    } catch(error) {
        console.error(error);
        return next(error);
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (auth_error, user, info) => {
        if (auth_error) {
            console.error(auth_error);
            return next(auth_error);
        }
        if (!user) {
            return res.redirect(`/login?login_error=${info.message}`);
        }
        return req.logIn(user, (login_error) => {
            if (login_error) {
                console.error(login_error);
                return next(login_error);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/login',
}), (req, res) => {
    res.redirect('/add');
});

module.exports = router;
