interface Window {
    electronAPI: {
        selectFolder: () => Promise<{ name: string; path: string }[]>;

        getSongInfo: (
            filePath: string,
        ) => Promise<{ buffer: ArrayBuffer; mime: string; cover: string | null }>;

        setWindowTitle: (songName: string) => void;

        onMediaPlayPause: (callback: () => void) => void;

        onMediaNext: (callback: () => void) => void;

        onMediaPrev: (callback: () => void) => void;

        showOverlayWindow: (data: {
            title: string | undefined;
            cover: string | null;
            isPlaying: boolean;
        }) => void;

        onOverlayWindowData: (
            callback: (data: { title: string; cover: string | null; isPlaying: boolean }) => void,
        ) => void;
    };
}
