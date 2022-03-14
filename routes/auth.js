const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { loggedIn, notLoggedIn } = require('./status');
const router = express.Router();
// 로그인 상태
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(req.user);
    } else {
        res.send(null);
    }
});
// 회원가입
router.post('/join', notLoggedIn, async (req, res, next) => {
    const {
        email,
        userId,
        password,
        nickname,
        address,
        fullAddress
    } = req.body;
    try {
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            userId,
            password: hash,
            nick: nickname,
            address,
            fullAddress,
        });
        return res.redirect('http://localhost:3000');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});
// 카카오 로그인 추가 정보 입력
router.post('/join/kakao', async (req, res, next) => {
    const {
        nickname,
        address,
        fullAddress
    } = req.body;
    try {
        await User.update({
            nick: nickname,
            address,
            fullAddress,
        }, {
            where: {
                id: req.user.id
            }
        })
        return res.redirect('http://localhost:3000');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});
// 이메일 중복 확인
router.get('/email?:email', async (req, res, next) => {
    const email = req.query.email;
    try {
        const exEmail = await User.findOne({
            where: {
                email
            }
        })
        console.log(exEmail);
        if (exEmail) {
            return res.send(true);
        } else {
            return res.send(false);
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
});
// 닉네임 중복 확인
router.get('/nick?:nick', async (req, res) => {
    const nick = req.query.nick;
    try {
        const exNick = await User.findOne({
            where: {
                nick
            }
        })
        if (exNick) {
            return res.send(true);
        } else {
            return res.send(false);
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
});
// 아이디 중복 확인
router.get('/id?:id', async (req, res) => {
    const userId = req.query.id;
    try {
        const exUserId = await User.findOne({
            where: {
                userId
            }
        })
        if (exUserId) {
            return res.send(true);
        } else {
            return res.send(false);
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
});
// 로그인
router.post('/login', notLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.send(info.message);
        }
        return req.logIn(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.send('');
        });
    })(req, res, next);
});
// 로그아웃
router.get('/logout', loggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    return res.redirect('http://localhost:3000');
});
// 카카오 로그인
router.get('/kakao', notLoggedIn, passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: 'http://localhost:3000/login',
}), (req, res) => {
    if (req.user.nick == '') {
        res.redirect('http://localhost:3000/join/kakao')
    } else {
        res.redirect('http://localhost:3000');
    }
});
// 내 정보 수정
router.post('/update', async (req, res, next) => {
    try {
        const {
            password,
            nickname,
            address,
            fullAddress
        } = req.body;

        const hash = await bcrypt.hash(password, 12);
        await User.update({
            password: hash,
            nick: nickname,
            address,
            fullAddress,
        }, {
            where: {
                id: req.user.id
            },
        })
        res.send("OK");
    } catch (err) {
        return next(err);
    }
});
// 회원탈퇴
router.get('/delete', async (req, res, next) => {
    try {
        await User.destroy({
            where: {
                id: req.user.id
            },
        })
        res.send("OK");
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
