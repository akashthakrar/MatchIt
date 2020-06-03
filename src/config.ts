export = {
    server: {
        port: process.env.PORT || 3500,
        logLevel: process.env.LOG_LEVEL || 'all',
        mongoDBConnectionUrl: process.env.DB_URL || 'mongodb://127.0.0.1:27017/matchit'
    }
};

