const devConfig = require('./next.config.dev.js');
const prodConfig = require('./next.config.prod.js');

module.exports = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;