import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    selectFolder: () => ipcRenderer.invoke('select-folder'),

    getSongInfo: (filePath: string) => ipcRenderer.invoke('get-song-info', filePath),

    setWindowTitle: (songName: string) => ipcRenderer.send('set-window-title', songName),
});
