import pino from "pino";

/*
NOTE: KEEP THIS COMMENT BLOCK PLZ
default pino 'log level numbers'
off     100 ("silent")
fatal   60
error   50
warn    40
info    30
debug   20
trace   10
all     no equivalent
*/

const transports: pino.DestinationStream = pino.transport({
    targets: [
        {
            level: 'debug',
            target: 'pino-pretty',
        },
    ],
});
export const logger = pino({
    level: process.env.PINO_MINIMUM_LOG_LEVEL ?? 'debug',
}, transports);

const _logger = logger;
export function scopedLogger(name: string, logger?: pino.Logger<never>) {
    const __logger = logger ?? _logger;
    return __logger.child({
        scope: name,
    });
}
export function routeLogger(name: string, logger?: pino.Logger<never>) {
    const __logger = logger ?? _logger;
    return __logger.child({
        route: name,
    });
}