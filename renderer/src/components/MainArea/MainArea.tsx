import type { MainAreaProps } from '../../types/types';

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
        <main>
            <h2>
                <span>{activeTab === 'shuffle' ? 'Shuffled' : 'Library'}</span>
                <span>
                    <button onClick={onShuffle}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            width="20"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M16 3h5v5h-2V6.41l-5.3 5.3-1.4-1.41 5.3-5.3H16V3zM4 4h2.59l5.3 5.3-1.42 1.42L5 5.41V8H3V3h1zm0 16h5v-2H6.41l5.3-5.3-1.41-1.4-5.3 5.3V16H3v5h1v-1zm16-1v-2h-1.59l-5.3-5.3 1.42-1.42L19 14.59V12h2v5h-1z" />
                        </svg>
                        Shuffle
                    </button>
                    <button onClick={onSelectFolder}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            width="20"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2z" />
                        </svg>
                        Select folder
                    </button>
                </span>
            </h2>
            <ul>
                {songsList.map((song, index) => (
                    <li
                        key={song.path}
                        onClick={() => {
                            onSongSelect(index);
                        }}
                    >
                        <div>
                            <strong>{song.name.replace('.mp3', '')}</strong>
                            <br />
                            <small>{song.path}</small>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    );
}
