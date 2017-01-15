import { Application } from './application';

/** Handler for crashes */

process.on('uncaughtException', (err) => {

    // @TODO need implement

    let date = new Date();

    console.error(date.toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);

    const dialog = require('electron').dialog;

    dialog.showMessageBox({
        type: 'error',
        message: 'A JavaScript error occurred in the main process',
        detail: err.stack,
        buttons: ['OK'],
    });

    process.exit(1);

});

// Initialize Application

let app = new Application();
