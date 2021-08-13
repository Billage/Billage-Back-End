const express = require('express');
const morgan = require('morgan');
const cookie_parser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();

const index_router = require('./routes/index');
const auth_router = require('./routes/auth');
const post_router = require('./routes/post');
const { sequelize } = require('./models');
const passport_config = require('./passport');
const app = express();

passport_config();
app.set('port', process.env.PORT || 7000);
sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'static')));
app.use('img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(passport.initialize()); 
app.use(passport.session());

app.use('/', index_router);
app.use('/auth', auth_router);
app.use('/post', post_router);
// 404
app.use((req, res, next) => {
    const error =  new Error(`${req.method}${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
// 에러
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
    });

app.listen(app.get('port'), () => {
    console.log('서버 실행 중');
});