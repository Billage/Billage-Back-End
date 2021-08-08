const express = require('express');
const Post = require('../models/post');

const router = express.Router();

router.post('/write',  async (req, res, next) => {
    const { title, body } = req.body;
    try {
        await Post.create({ // 객체 생성
            title,
            body,
        });
        return res.redirect('/board');
    } catch(err) {
        console.error(error);
        return next(error);
    }
});

router.get('/board', )

module.exports = router;
