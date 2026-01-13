import { useState } from 'react';
import type { Song } from '../../types/types';

export function useLibrary() {
    const [songs, setSongs] = useState<Song[]>(() => {
        const saved = localStorage.getItem('songs');
        return saved ? JSON.parse(saved) : [];
    });

    const selectFolder = async () => {
        const files = await window.electronAPI.selectFolder();
        if (!files.length) return;

        const sorted = [...files].sort((a, b) =>
            a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
        );

        setSongs(sorted);
        localStorage.setItem('songs', JSON.stringify(sorted));
    };
    return { songs, setSongs, selectFolder };
}
