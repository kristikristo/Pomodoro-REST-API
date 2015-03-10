var config = {}

config.db_dev = 'mongodb://URL_DEVELOPMENT';
config.db_prod = 'mongodb://URL_PRODUCTION';
config.port = process.env.PORT || 8080;

module.exports = config;