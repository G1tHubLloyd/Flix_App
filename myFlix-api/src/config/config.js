module.exports = {
    PORT: process.env.PORT || 8080,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/myflix',
    JWT_SECRET: process.env.JWT_SECRET || 'replace_with_secure_secret',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d'
};
