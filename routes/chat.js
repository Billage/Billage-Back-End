const express = require('express');
const sequelize = require("sequelize");
const { Chat, Room } = require('../models');
const { loggedIn } = require('./status');
const router = express.Router();
const Op = sequelize.Op;
// 쪽지 목록
router.get('/', async (req, res, next) => {
    try {
        const user = req.user.nick;
        const rooms = await Room.findAll({
            where:{
                [Op.or]: [
                    { user1: user },
                    { user2: user }
                ]
            }
        })
        res.send(rooms);
    } catch (error) {
        return next(error);
    }
});
// 쪽지 보내기
router.post('/send', async (req, res, next) => {
    try {
        const { roomId, body, date } = req.body;
        await Chat.create({
            roomId,
            body,
            sender: req.user.nick,
            date,
        }); 
        await Room.update({
            latest: body,
        }, {   
            where: {
                roomId,
            },
        })
        res.redirect('/chat');
    } catch (error) {
        return next(error);
    }
});
// 방 생성
router.post('/room', async (req, res, next) => {
    try {
        const { roomId, user1, user2 } = req.body;
        await Room.create({
            roomId,
            user1,
            user2,
        });
        res.redirect('/chat');
    } catch (error) {
        return next(error);
    }
});
// 방 조회
router.get('/room?:roomId', async (req, res, next) => {
    try {
        const chats = await Chat.findAll({
            where: {
                roomId: req.query.roomId,
            }
        })
        res.send(chats);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;