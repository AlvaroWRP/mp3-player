import type { MainAreaProps } from '../../types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle, faFolder } from '@fortawesome/free-solid-svg-icons';

export function MainArea({
    activeTab,
    songs,
    shuffledSongs,
    currentSongIndex,
    onSongSelect,
    onShuffle,
    onSelectFolder,
}: MainAreaProps) {
    const songsList = activeTab === 'shuffle' && shuffledSongs.length ? shuffledSongs : songs;
    const isShuffleEmpty = activeTab === 'shuffle' && shuffledSongs.length === 0;

    return (
        <main className="flex flex-col flex-1 overflow-y-auto px-6">
            <header className="sticky top-0 z-10 flex items-center justify-between bg-neutral-900/90 backdrop-blur py-4 mb-6">
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
            {isShuffleEmpty ? (
                <div className="flex flex-1 items-center justify-center text-neutral-400">
                    <div className="text-center">
                        <p className="text-lg font-medium">No shuffled songs yet</p>
                        <p className="text-sm mt-1">
                            Click <span className="text-white">Shuffle</span> to generate a shuffled
                            list
                        </p>
                    </div>
                </div>
            ) : (
                <ul className="space-y-2 pb-2">
                    {songsList.map((song, index) => (
                        <li
                            key={song.path}
                            onClick={() => {
                                onSongSelect(index, activeTab);
                            }}
                            className={[
                                'p-3 rounded-md cursor-pointer transition hover:bg-neutral-800 hover:translate-x-1',
                                index === currentSongIndex
                                    ? 'bg-neutral-700/70 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.6)]'
                                    : 'bg-transparent',
                            ].join(' ')}
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
            )}
        </main>
    );
}
