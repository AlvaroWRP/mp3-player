import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    selectFolder: () => ipcRenderer.invoke('select-folder'),

    getSongInfo: (filePath: string) => ipcRenderer.invoke('get-song-info', filePath),

    setWindowTitle: (songName: string) => ipcRenderer.send('set-window-title', songName),

    onMediaPlayPause: (callback: () => void) => {
        ipcRenderer.removeAllListeners('media-play-pause');
        ipcRenderer.on('media-play-pause', callback);
    },

    onMediaNext: (callback: () => void) => {
        ipcRenderer.removeAllListeners('media-next');
        ipcRenderer.on('media-next', callback);
    },

    onMediaPrev: (callback: () => void) => {
        ipcRenderer.removeAllListeners('media-prev');
        ipcRenderer.on('media-prev', callback);
    },

    showOverlayWindow: (data: {
        title: string | undefined;
        cover: string | null;
        isPlaying: boolean;
    }) => ipcRenderer.send('show-overlay-window', data),

    onOverlayWindowData: (
        callback: (data: {
            title: string | undefined;
            cover: string | null;
            isPlaying: boolean;
        }) => void,
    ) => ipcRenderer.on('overlay-window-data', (_, data) => callback(data)),
});
