class AppError extends Error {
    constructor(message, pathUrlErr) {
        super(message);

        this.pathUrlErr = pathUrlErr;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;