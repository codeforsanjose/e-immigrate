const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');
const ERRMSG = { error: { message: 'Not logged in or auth failed' } };

//route for authentication with client's jwt
module.exports = (req, res, next) => {
    let token = '';
    if (req.header && req.header('Authorization')) {
        token = req.header('Authorization').split(' ')[1];
    }
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, function (err, decodedToken) {
            if (err) {
                return res.status(401).json(ERRMSG);
            }
            if (decodedToken) {
                let email = decodedToken.email;
                Admin.findOne({ email: email })
                    .exec()
                    .then((admin) => {
                        if (!admin) return res.status(404).json(ERRMSG);
                        else {
                            let adminObj = JSON.parse(JSON.stringify(admin));
                            delete adminObj.password;
                            return adminObj;
                        }
                    })
                    .then((body) => {
                        req.user = body;
                        next();
                    });
            } else {
                return res.status(401).json(ERRMSG);
            }
        });
    } else {
        return res.status(401).json(ERRMSG);
    }
};
