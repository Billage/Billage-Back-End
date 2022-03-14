const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const senderInfo = require('../config/senderInfo.json');
const { User } = require('../models');

const mailSender = {
  sendGmail: function (param) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      prot: 587,
      host: 'smtp.gmlail.com',
      secure: false,
      requireTLS: true,
      auth: {
        user: senderInfo.user,
        pass: senderInfo.pass 
      }
    });
    // 메일 옵션
    var mailOptions = {
      from: senderInfo.user,
      to: param.toEmail,
      subject: param.subject, // 메일 제목
      text: param.text, // 메일 내용
    };
    // 메일 발송    
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}
// 아이디 찾기
router.get('/id?:email', async (req, res, next) => {
  const email = req.query.email;
  try {
    const exEmail = await User.findOne({
      where: {
        email
      }
    })
    if (exEmail) {
      var info = {
        toEmail: email,
        subject: '[빌리지] 아이디 찾기',
        text: ``,
      }
      mailSender.sendGmail(info);
      return res.send(true);
    } else {
      return res.send(false);
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});
// 비밀번호 찾기
router.get('/pw?:email', async (req, res) => {
  const id = req.query.id;
  const email = req.query.email;
  try {
    const exEmail = await User.findOne({
      where: {
        userId: id,
        email,
      }
    })
    if (exEmail) {
      const newPassword = Math.random().toString(36).slice(2);
      var info = {
          toEmail: email,
          subject: '[빌리지] 비밀번호 재설정',
          text: `임시 비밀번호는 ${newPassword}입니다.`,
      }
      console.log(exEmail);
      mailSender.sendGmail(info);
      return res.send(true);
    } else {
      return res.send(false);
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
