const winston = require("winston");
winston.emitErrs = true;

export const log = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: "debug",
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});
