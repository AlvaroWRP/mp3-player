import fs from 'fs';
import path from 'path';

import { app, BrowserWindow, ipcMain, dialog, globalShortcut, screen } from 'electron';
import { autoUpdater } from 'electron-updater';
import { parseFile } from 'music-metadata';

let mainWindow: BrowserWindow;
let overlayWindow: BrowserWindow;
let overlayTimeout: NodeJS.Timeout | null = null;

const overlayWindowWidth = 0.2;
const overlayWindowHeight = 0.15;
const marginX = 0.015;
const marginY = 0.02;

const isDev = !app.isPackaged;

function loadIndex() {
    if (isDev) {
        mainWindow.loadURL('http://localhost:5173');
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    } else {
        mainWindow.loadFile(path.join(__dirname, '..', '..', 'renderer', 'dist', 'index.html'));
    }
}

function loadOverlayWindow() {
    if (isDev) {
        overlayWindow.loadURL('http://localhost:5173/#/overlay');
    } else {
        overlayWindow.loadFile(path.join(__dirname, '..', '..', 'renderer', 'dist', 'index.html'), {
            hash: '/overlay',
        });
    }
}

function getOverlayWindowBoundaries() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    const overlayWidth = Math.round(width * overlayWindowWidth);
    const overlayHeight = Math.round(height * overlayWindowHeight);

    const x = Math.round(width * marginX);
    const y = Math.round(height * marginY);

    return { overlayWidth, overlayHeight, x, y };
}

function createOverlayWindow() {
    const { overlayWidth, overlayHeight, x, y } = getOverlayWindowBoundaries();

    overlayWindow = new BrowserWindow({
        width: overlayWidth,
        height: overlayHeight,
        x: x,
        y: y,
        frame: false,
        transparent: true,
        resizable: false,
        alwaysOnTop: true,
        skipTaskbar: true,
        focusable: false,
        hasShadow: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    overlayWindow.setAlwaysOnTop(true, 'screen-saver');
    overlayWindow.setVisibleOnAllWorkspaces(true);

    loadOverlayWindow();

    overlayWindow.hide();
}

const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        minWidth: 800,
        minHeight: 600,
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

    mainWindow.on('closed', () => {
        if (overlayWindow && !overlayWindow.isDestroyed()) {
            overlayWindow.destroy();
        }
    });
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

ipcMain.on('set-window-title', (_, songName: string) => {
    mainWindow.setTitle(`MP3 Player - ${songName}`);
});

ipcMain.on('show-overlay-window', (_, data) => {
    if (!overlayWindow) return;

    overlayWindow.webContents.send('overlay-window-data', data);

    if (!overlayWindow.isVisible()) {
        overlayWindow.showInactive();
    }

    if (overlayTimeout) {
        clearTimeout(overlayTimeout);
    }

    overlayTimeout = setTimeout(() => {
        overlayWindow.hide();
        overlayTimeout = null;
    }, 3000);
});

autoUpdater.on('update-available', () => {
    console.log('Update available');
});

autoUpdater.on('update-downloaded', () => {
    console.log('Update downloaded');
    autoUpdater.quitAndInstall();
});

app.whenReady().then(async () => {
    createMainWindow();
    createOverlayWindow();

    if (!isDev) {
        try {
            await autoUpdater.checkForUpdatesAndNotify();
        } catch (error) {
            console.trace(error);
        }
    }

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });

    globalShortcut.register('MediaPlayPause', () => {
        mainWindow.webContents.send('media-play-pause');
    });

    globalShortcut.register('MediaNextTrack', () => {
        mainWindow.webContents.send('media-next');
    });

    globalShortcut.register('MediaPreviousTrack', () => {
        mainWindow.webContents.send('media-prev');
    });
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
