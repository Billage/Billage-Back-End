const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();

const { sequelize } = require('./models');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const wishRouter = require('./routes/wish');
const chatRouter = require('./routes/chat');
const mailRouter = require('./routes/mail');
const reviewRouter = require('./routes/review');
const passportConfig = require('./passport');
const app = express();

// 설정
app.set('port', process.env.PORT || 7000);
app.set('views', './views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
sequelize.sync({
        force: false
    })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });
passportConfig();
app.use(morgan('dev'));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET, PUT, POST, DELETE",
    credentials: true,
};
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());
// 라우터
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/wish', wishRouter);
app.use('/chat', chatRouter);
app.use('/mail', mailRouter);
app.use('/review', reviewRouter);
// 404
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
// 에러
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    console.log(err);
    res.render('error');
});
//
app.listen(app.get('port'), () => {
    console.log('서버 실행 중');
});