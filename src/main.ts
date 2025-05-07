import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { parseFile } from 'music-metadata';

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

ipcMain.handle('select-folder', async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openDirectory'],
    });

    if (result.canceled || result.filePaths.length === 0) {
        return [];
    }

    const folderPath = result.filePaths[0];

    const files = fs
        .readdirSync(folderPath)
        .filter((file) => file.toLowerCase().endsWith('.mp3'))
        .map((file) => ({
            name: file,
            path: path.join(folderPath, file),
        }));

    return files;
});

ipcMain.handle('get-song-info', async (event, filePath: string) => {
    const fileUrl = pathToFileURL(filePath).href;

    try {
        const metadata = await parseFile(filePath);
        const picture = metadata.common.picture?.[0];

        let coverDataUrl = null;

        if (picture) {
            const base64 = Buffer.from(picture.data).toString('base64');
            coverDataUrl = `data:${picture.format};base64,${base64}`;
        }

        return {
            url: fileUrl,
            cover: coverDataUrl,
        };
    } catch (error) {
        console.trace(error);
        return { url: fileUrl, cover: null };
    }
});

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
