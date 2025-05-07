interface Window {
    electronAPI: {
        selectFolder: () => Promise<{ name: string; path: string }[]>;

        getSongInfo: (filePath: string) => Promise<{ url: string; cover: string | null }>;
    };
}
