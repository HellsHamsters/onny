import { app, BrowserWindow, globalShortcut, Menu, Tray } from 'electron';

const path  = require('path');
const url   = require('url');

export class Application {

    public application: any = app;
    public window: BrowserWindow;

    public preload = path.join(__dirname, 'browser.bundle.js');
    public options = {

        window: {

            title: 'Onny',
            width: 1050,
            height: 500,
            frame: false,
            show: false,
            transparent: true,

            resizable: false,
            fullscreenable: false,
            movable: false,
            maximizable: false,
            minimizable: false,
            alwaysOnTop: true,

            webPreferences: {

                preload: this.preload,
                nodeIntegration: false,
                plugins: true,

                devTools: (process.env.NODE_ENV === 'development'),
                textAreasAreResizable: false,
                webgl: false,
                defaultFontFamily: 'sans-serif',
                defaultEncoding: 'UTF-8',

            }

        },

        url: 'https://vk.com/login',

    };


    constructor() {

        this.application.on('ready', this.OnReady.bind(this));
        this.application.on('activate', this.OnActivate.bind(this));
        this.application.on('will-quit', this.OnWillQuit.bind(this));

    }

    public initializeWindow() {

        this.application.dock.hide();

        require('electron-context-menu')({
            showInspectElement: (process.env.NODE_ENV === 'development'),
            prepend: (params, browserWindow) => [{
                label: 'Onny',
            }]
        });

        this.window = new BrowserWindow(this.options.window);
        this.window.setMenu(null);
        this.window.loadURL(this.options.url);

        this.window.webContents.openDevTools();

        this.window.once('ready-to-show', () => {

            this.initializeShortcuts();
            this.initializeTray();

        });

        this.window.on('closed', () => {
            this.window = null;
        });

        this.window.on('blur', () => {
            this.window.hide();
        });

    }

    private initializeShortcuts() {

        globalShortcut.register('mediaplaypause', () => {
            console.log('mediaplaypause');
            this.window.webContents.send('control', 'play-pause');
        });

        globalShortcut.register('mediaprevioustrack', () => {
            console.log('mediaprevioustrack');
            this.window.webContents.send('control', 'play-prev');
        });

        globalShortcut.register('medianexttrack', () => {
            console.log('medianexttrack');
            this.window.webContents.send('control', 'play-next');
        });

    }

    private initializeTray() {
        (new Tray(path.resolve(__dirname, 'assets', 'icon_tray.png'))).on('click', this.OnTrayClick.bind(this));
    }

    private OnTrayClick(event, args) {

        if (this.window.isVisible()) {
            this.window.hide();
        } else {
            this.window.setPosition(args.x, args.y, false);
            this.window.show();
        }

    }

    public OnActivate() {
        if (this.window === null) {
            this.initializeWindow();
        }
    }

    public OnReady() {
        this.initializeWindow();
    }

    public OnWillQuit() {
        globalShortcut.unregisterAll();
    }

}
