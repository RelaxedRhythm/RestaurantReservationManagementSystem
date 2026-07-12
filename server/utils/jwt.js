const jwt = require('jsonwebtoken');

function generateToken(id, role) {
    return jwt.sign(
        { _id: id, role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );
}

module.exports=generateToken;