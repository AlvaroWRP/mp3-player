import { useEffect, useRef } from 'react';
import type { SongsRendererProps } from '../../types/types';

export function SongsRenderer({
    activeTab,
    songs,
    shuffledSongs,
    currentSongIndex,
    onSongSelect,
}: SongsRendererProps) {
    const songsList = activeTab === 'shuffle' && shuffledSongs.length ? shuffledSongs : songs;
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

    useEffect(() => {
        const el = itemRefs.current[currentSongIndex];

        if (!el) return;

        el.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    }, [currentSongIndex, activeTab]);

    return (
        <ul className="space-y-2 pb-2">
            {songsList.map((song, index) => (
                <li
                    ref={(el) => {
                        itemRefs.current[index] = el;
                    }}
                    key={song.path}
                    onClick={() => {
                        onSongSelect(song.path, activeTab);
                    }}
                    className={`p-3 rounded-md cursor-pointer transition hover:bg-neutral-800 hover:translate-x-1 ${
                        index === currentSongIndex
                            ? 'bg-neutral-700/70 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.6)]'
                            : ''
                    }`}
                >
                    <strong
                        className={`block ${index === currentSongIndex ? 'text-blue-400' : ''}`}
                    >
                        {song.name.replace('.mp3', '')}
                    </strong>
                    <small className="text-neutral-400 truncate block">{song.path}</small>
                </li>
            ))}
        </ul>
    );
}
