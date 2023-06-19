const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {
    if (req.originalUrl.startsWith('/api/sendfeedback')) {
        // skip any /api/sendfeedback routes
        next();
    }
    else {
        const origin = req.headers.origin;
        if (allowedOrigins.includes(origin)) {
            res.header('Access-Control-Allow-Credentials', true);
        }
        next();
    }
}

module.exports = credentials;