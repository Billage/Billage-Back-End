const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { User, Post, Image } = require('../models');
const { logged_in } = require('./status');
const router = express.Router();

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
// 이미지 업로드 설정
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});
// 이미지 업로드
router.post('/upload', logged_in, upload.array('img', 5), (req, res) => {
    console.log("파일 이름 : ", req.files); 
    let url_arr = new Array(); 
    for(let i = 0; i < req.files.length; i++) { 
        url_arr.push(`/uploads/${req.files[i].name}`); 
        console.log(url_arr[i]); 
    }
    const json_url = JSON.stringify(url_arr); 
    res.json(json_url);
});
// 게시글 작성
router.get('/new', logged_in, (req, res) => {
    res.render('new');
});
router.post('/write', logged_in, async (req, res, next) => {
    try {
        await Post.create({
            title: req.body.title,
            body: req.body.body,
            user_id: req.user.id,
        });
        for(let i =0; i < req.json_url.length; i++) {
            await Image.create({
                name: req.body.name,
                url: req.body.json_url,
            })
        }
        return res.redirect('/post');
    } catch(err) {
        console.error(err);
        return next(err);
    }
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
    } catch(err) {
        console.error(err);
        return next(err); 
    }
});

module.exports = router;
