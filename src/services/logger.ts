import log4js = require('log4js');
import morgan = require('morgan');

/**
 * Declarations & Implementations
 */
export let log = log4js.getLogger();
log.level = process.env.LOG_LEVEL || 'all';
export let morganInstance = morgan('dev', {
    stream: {
        write: (str) => {log.debug(str)}
    }
});

/**
 * Service Export
 */
