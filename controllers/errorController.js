const AppError = require('../utils/appError');

const handleDuplicateFieldsDB = (err, req) => {
    const value = err.errmsg.match(/(["'])(.*?[^\\])\1/)[0];

    const message = `Duplicate field value: ${value}. Please use another value!!`;
    return new AppError(message, req.originalUrl);
};
const sendErrorDev = (err, res) => {
    if (err.pathUrlErr.includes("/")) {
        const viewsHBS = err.pathUrlErr.match(/[^\/]*$/)
        res.render(viewsHBS[0], {
            error: err.message
        });
        return;
    }
    res.render(err.pathUrlErr, {
        error: err.message
    });
};
// const sendErrorProd = (err, res) => {
//     if (err.pathUrlErr.includes("/")) {
//         const viewsHBS = err.pathUrlErr.match(/[^\/]*$/)
//         res.render(viewsHBS[0], {
//             err: err.message
//         });
//         return;
//     }
//     res.render(err.pathUrlErr, {
//         err: err.message
//     });

// };

module.exports = (err, req, res, next) => {
    err.pathUrlErr = req.pathUrlErr || req.originalUrl;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        if (err.code === 11000) {
            err = handleDuplicateFieldsDB(err, req);
        }
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        sendErrorProd(err, res);
    }
};