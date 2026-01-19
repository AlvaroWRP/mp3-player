import type { MainAreaProps } from '../../types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle, faFolder } from '@fortawesome/free-solid-svg-icons';

export function MainArea({
    activeTab,
    songs,
    shuffledSongs,
    onSongSelect,
    onShuffle,
    onSelectFolder,
}: MainAreaProps) {
    const songsList = activeTab === 'shuffle' && shuffledSongs.length ? shuffledSongs : songs;

    return (
        <main className="flex-1 overflow-y-auto p-6">
            <header className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">
                    {activeTab === 'shuffle' ? 'Shuffled' : 'Library'}
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={onShuffle}
                        className="flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 transition cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faShuffle}></FontAwesomeIcon>
                        Shuffle
                    </button>
                    <button
                        onClick={onSelectFolder}
                        className="flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 transition cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faFolder}></FontAwesomeIcon>
                        Select folder
                    </button>
                </div>
            </header>
            <ul className="space-y-2">
                {songsList.map((song, index) => (
                    <li
                        key={song.path}
                        onClick={() => {
                            onSongSelect(index);
                        }}
                        className="p-3 rounded-md hover:bg-neutral-800 cursor-pointer transition hover:translate-x-1"
                    >
                        <strong className="block">{song.name.replace('.mp3', '')}</strong>
                        <small className="text-neutral-400 truncate block">{song.path}</small>
                    </li>
                ))}
            </ul>
        </main>
    );
}
