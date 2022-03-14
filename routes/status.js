exports.loggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인이 필요합니다.');
    }
};

exports.notLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('이미 로그인 한 상태입니다.');
    }
};