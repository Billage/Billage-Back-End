const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { User, Post, Image } = require('../models');
const { logged_in } = require('./status');
const router = express.Router();
// 업로드 폴더 생성
try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더 생성');
    fs.mkdirSync('uploads');
}
// 게시판
router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                attributes: ['nick'],
            },
            order: [['createdAt', 'DESC']],
        });
        await res.render('board', { posts });
    }catch (err) {
        console.error(err);
        next(err);
    }
});
// 설정
const image_upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            console.log(ext);
            cb(null, path.basename(file.originalname, ext) + '_' + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});
const post_upload = multer();
// 게시글 작성 뷰
router.get('/new', logged_in, (req, res) => {
    res.render('new');
});
// 게시글 작성
router.post('/write', logged_in, post_upload.array('img', 5), async (req, res, next) => {
    try {
        await Post.create({
            title: req.body.title,
            body: req.body.body,
            user_id: req.user.id,
        });
    res.redirect('/post');
    } catch (err) {
        console.error(err);
        return next(err);
    }
});
// 이미지 업로드
router.post('/img', logged_in, image_upload.array('img', 5), async (req, res, next) => {
    for (let i = 0; i < req.files.length; i++) {
        await Image.create({
            name: req.files[i].filename,
            url: req.files[i].path
        });
    }
    res.redirect('/post');
});
// 게시글 조회
router.get('/:id', async (req, res, next) => {
    try {
        const post = await Post.findOne({ 
            where: { id: req.params.id },
            include: {
                model: User,
                attributes: ['nick'],
            },
        });
        await res.render('show', { post });
    } catch (err) {
        console.error(err);
        return next(err); 
    }
});

module.exports = router;
