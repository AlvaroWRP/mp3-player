import path from 'path';

import { app, BrowserWindow } from 'electron';

let mainWindow: BrowserWindow;

function loadHomepage() {
    mainWindow.loadFile(path.join(__dirname, '../../static/html/homepage.html'));
}

const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        icon: path.join(__dirname, '../../static/images/icon.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.menuBarVisible = false;

    if (process.env.NODE_ENV !== 'production') {
        mainWindow.webContents.openDevTools();
    }

    loadHomepage();
};

app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
