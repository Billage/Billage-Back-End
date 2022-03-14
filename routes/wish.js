const { Post, Wish } = require('../models');
const { loggedIn } = require('./status');
const express = require('express');
const router = express.Router();
// 등록
router.post('/on', async (req, res, next) => {
    try {
        await Wish.create({
            postId: req.body.postId,
            userId: req.user.id,
        })
        res.send();
    } catch (err) {
        return next(err);
    }
});
// 해제
router.post('/off', async (req, res, next) => {
    try {
        await Wish.destroy({
            where: {
                postId: req.body.postId,
                userId: req.user.id,
            },
        })
        res.send();
    } catch (err) {
        return next(err);
    }
});
// 찜 여부
router.get('/id?:id', async (req, res, next) => {
    try {
        const check = await Wish.findOne({
            where: {
                postId: req.query.id
            },
        })
        if (check) {
            res.send(true)
        } else {
            res.send(false)
        }
    } catch (err) {
        return next(err);
    }
});
// 빌려줄게요 찜 목록 조회
router.get('/lend', async (req, res, next) => {
    try {
        const wishList = await Wish.findAll({
            where: {
                userId: req.user.id,
            },
            include: {
                model: Post,
                where: {
                    board: '빌려줄게요',
                }
            },
            order: [
                ['createdAt', 'DESC']
            ],
        });
        console.log(wishList);
        res.send(wishList);
    } catch (err) {
        return next(err);
    }
});
// 빌려주세요 찜 목록 조회
router.get('/borrow', async (req, res, next) => {
    try {
        const wishList = await Wish.findAll({
            where: {
                userId: req.user.id,
            },
            include: {
                model: Post,
                where: {
                    board: '빌려주세요',
                }
            },
            order: [
                ['createdAt', 'DESC']
            ],
        });
        res.send(wishList);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;