import fs from 'fs';
import path from 'path';

import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { parseFile } from 'music-metadata';

let mainWindow: BrowserWindow;

function loadIndex() {
    const isDev = !app.isPackaged;

    if (isDev) {
        mainWindow.loadURL('http://localhost:5173');
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(__dirname, '..', '..', 'renderer', 'dist', 'index.html'));
    }
}

const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        icon: path.join(__dirname, '..', '..', 'assets', 'images', 'icon.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.menuBarVisible = false;

    mainWindow.webContents.setWindowOpenHandler(() => {
        return { action: 'deny' };
    });

    loadIndex();
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

ipcMain.handle('get-song-info', async (_, filePath: string) => {
    try {
        const buffer = await fs.promises.readFile(filePath);
        const metadata = await parseFile(filePath);
        const picture = metadata.common.picture?.[0];

        let coverDataUrl: string | null = null;

        if (picture) {
            const base64 = Buffer.from(picture.data).toString('base64');
            coverDataUrl = `data:${picture.format};base64,${base64}`;
        }

        return {
            buffer,
            mime: 'audio/mpeg',
            cover: coverDataUrl,
        };
    } catch (error) {
        console.trace(error);
        return null;
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
