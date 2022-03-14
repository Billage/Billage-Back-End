const express = require('express');
const { Review } = require('../models');
const { loggedIn } = require('./status');
const router = express.Router();
// 리뷰 작성
router.post('/write', async (req, res, next) => {
    try {
        const { score, body, postId, date } = req.body;
        await Review.create({
            nick: req.user.nick,
            score,
            body,
            postId,
            date,
        })
    } catch (err) {
        return next(err);
    }
})
// 리뷰 조회
router.get('/id?:id', async (req, res, next) => {
    try {
        const review = await Review.findOne({
            where: {
                id: req.query.id,
            },
        });
        res.send(review);
    } catch (err) {
        return next(err);
    }
});
// 리뷰 목록 조회
router.get('/list/id?:id', async (req, res, next) => {
    try {   
        const reviews = await Review.findAll({
            where: {
                postId: req.query.id
            },
        });
        res.send(reviews);
    } catch (err) {
        return next(err);
    }
});
// 내가 쓴 리뷰 조회
router.get('/list', async (req, res, next) => {
    try {
        const reviews = await Review.findAll({
            where: {
                nick: req.user.nick,
            },
        });
        res.send(reviews);
    } catch (err) {
        return next(err);
    }
});
// 리뷰 수정
router.post('/update', async (req, res, next) => {
    try {
        const { score, body, date, id } = req.body;
        await Review.update({
            score,
            body,
            date,
        }, {
            where: {
                id: id
            },
        })
        res.send("OK");
    } catch (err) {
        return next(err);
    }
});
// 리뷰 삭제
router.delete('/id?:id', async (req, res, next) => {
    try {
        await Review.destroy({
            where: {
                postId: req.query.id,
                nick: req.user.nick,
            },
        })
        res.send("게시글 삭제");
    } catch (err) {
        return next(err);
    }
});
module.exports = router;