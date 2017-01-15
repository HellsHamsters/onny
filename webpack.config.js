switch(process.env.BUILD_TARGET){
    case 'BROWSER': module.exports = require('./webpack.browser.config.js'); break;
    case 'DESKTOP': module.exports = require('./webpack.desktop.config.js'); break;
}