const express = require('express');
const dotenv = require('dotenv');

const app = express();

app.set('port', process.env.PORT || 7000);

app.get('/', (req, res) => {
})

app.listen(app.get('port'), () => {
    console.log(app.get('port')+'번 포트에서 서버 실행 중');
});