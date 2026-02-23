interface Window {
    electronAPI: {
        selectFolder: () => Promise<{ name: string; path: string }[]>;

        getSongInfo: (
            filePath: string,
        ) => Promise<{ buffer: ArrayBuffer; mime: string; cover: string | null }>;

        setWindowTitle: (songName: string) => void;
    };
}
