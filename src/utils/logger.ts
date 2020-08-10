import winston from 'winston';

const addDate = winston.format(( info ) => {
    info.message = `${new Date().toISOString()} ${ info.message }`;
    return info;
})

export default winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            level: 'info',
            handleExceptions: true,
            format: winston.format.combine(
                addDate(),
                winston.format.simple()
            ),
            maxsize: 5120000,
            maxFiles: 5,
            filename: `${__dirname}/../logs/server-logs.log`,
        })
    ]
})