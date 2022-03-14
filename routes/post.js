const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { User, Post } = require('../models');
const { loggedIn } = require('./status');
const router = express.Router();
// 업로드 폴더 생성
try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더 생성');
    fs.mkdirSync('uploads');
}
// 멀터
const imgUpload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: {
        fileSize: 5 * 1024 * 1024
    },
});
//빌려줄게요 게시판
router.get('/lend', async (req, res, next) => {
    if (req.user) {
        try {
            const posts = await Post.findAll({
                where: {
                    board: '빌려줄게요',
                    address: req.user.address,
                },
                order: [
                    ['createdAt', 'DESC']
                ],
            });
            res.send(posts);
        } catch (err) {
            next(err);
        }
    } else {
        try {
            const posts = await Post.findAll({
                where: {
                    board: '빌려줄게요',
                },
                order: [
                    ['createdAt', 'DESC']
                ],
            });
            res.send(posts);
        } catch (err) {
            next(err);
        }
    }
});
// 빌려주세요 게시판
router.get('/borrow', async (req, res, next) => {
    if (req.user) {
        try {
            const posts = await Post.findAll({
                include: {
                    model: User,
                    attributes: ['nick'],
                },
                where: {
                    board: '빌려주세요',
                    address: req.user.address,
                },
                order: [
                    ['createdAt', 'DESC']
                ],
            });
            res.send(posts);
        } catch (err) {
            next(err);
        }
    } else {
        try {
            const posts = await Post.findAll({
                include: {
                    model: User,
                    attributes: ['nick'],
                },
                where: {
                    board: '빌려주세요',
                },
                order: [
                    ['createdAt', 'DESC']
                ],
            });
            res.send(posts);
        } catch (err) {
            next(err);
        }
    }
});
// 이미지 업로드
router.post('/img', imgUpload.array('img'), async (req, res, next) => {
    let imgArr = [];
    for (let i = 0; i < req.files.length; i++) {
        console.log(`/img/${req.files[i].filename}`);
        imgArr.push(`/img/${req.files[i].filename}`)
    }
    res.send(imgArr);
});
// 빌려줄게요 작성
router.post('/write/lend', loggedIn, async (req, res, next) => {
    try {
        const { 
            title, body, price, startDate, endDate, date, url
        } = req.body;
        await Post.create({
            nick: req.user.nick,
            address: req.user.address,
            userId: req.user.id,
            title,
            body,
            price,
            startDate,
            endDate,
            date,
            url,
            board: '빌려줄게요',
        });
        res.send('글 등록 성공');
    } catch (err) {
        return next(err);
    }
});
// 빌려주세요 작성
router.post('/write/borrow', loggedIn, async (req, res, next) => {
    const { 
        title, body, price, startDate, endDate, date
    } = req.body;
    try {
        await Post.create({
            nick: req.user.nick,
            address: req.user.address,
            userId: req.user.id,
            title,
            body,
            price,
            startDate,
            endDate,
            date,
            board: '빌려주세요',
        });
        res.send('글 등록 성공');
    } catch (err) {
        return next(err);
    }
});
// 게시글 조회
router.get('/id?:id', async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: {
                id: req.query.id
            },
        });
        res.send(post);
    } catch (err) {
        return next(err);
    }
});
// 게시글 수정
router.post('/update/id?:id', async (req, res, next) => {
    try {
        const { 
            title, body, price, startDate, endDate, date
        } = req.body;
        await Post.update({
            title,
            body,
            price,
            startDate,
            endDate,
            date,
            where: {
                id: req.query.id
            },
        })
        res.send("OK");
    } catch (err) {
        return next(err);
    }
});
// 게시글 삭제
router.delete('/id?:id', async (req, res, next) => {
    try {
        await Post.destroy({
            where: {
                id: req.query.id
            },
        })
        res.send("게시글 삭제");
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
