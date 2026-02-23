import { Header } from './Header';
import { EmptyState } from './EmptyState';
import { SongsRenderer } from './SongsRenderer';
import { useMemo, useState } from 'react';
import type { MainAreaProps } from '../../types/types';

export function MainArea({
    activeTab,
    songs,
    shuffledSongs,
    currentSongIndex,
    onSongSelect,
    onShuffle,
    onSelectFolder,
}: MainAreaProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredSongs = useMemo(() => {
        if (!searchQuery.trim()) return songs;

        const query = searchQuery.toLowerCase();

        return songs.filter((song) => song.name.toLowerCase().includes(query));
    }, [songs, searchQuery]);

    const filteredShuffledSongs = useMemo(() => {
        if (!searchQuery.trim()) return shuffledSongs;

        const query = searchQuery.toLowerCase();

        return shuffledSongs.filter((song) => song.name.toLowerCase().includes(query));
    }, [shuffledSongs, searchQuery]);

    const isLibraryEmpty = activeTab === 'library' && filteredSongs.length === 0;
    const isShuffleEmpty = activeTab === 'shuffle' && filteredShuffledSongs.length === 0;

    return (
        <main className="flex flex-col flex-1 overflow-y-auto px-6">
            <Header
                activeTab={activeTab}
                songs={songs}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onShuffle={onShuffle}
                onSelectFolder={onSelectFolder}
            ></Header>
            {isLibraryEmpty ? (
                <EmptyState
                    title={searchQuery ? 'No results' : 'No songs selected'}
                    subtitle={
                        searchQuery ? (
                            <>Try searching something else</>
                        ) : (
                            <>
                                Click <span className="text-white">Select folder</span> to add mp3
                                files
                            </>
                        )
                    }
                ></EmptyState>
            ) : isShuffleEmpty ? (
                <EmptyState
                    title={searchQuery ? 'No results' : 'No shuffled songs yet'}
                    subtitle={
                        searchQuery ? (
                            <>Try searching something else</>
                        ) : (
                            <>
                                Click <span className="text-white">Shuffle</span> to generate a
                                shuffled list
                            </>
                        )
                    }
                ></EmptyState>
            ) : (
                <SongsRenderer
                    activeTab={activeTab}
                    songs={filteredSongs}
                    shuffledSongs={filteredShuffledSongs}
                    currentSongIndex={currentSongIndex}
                    onSongSelect={onSongSelect}
                ></SongsRenderer>
            )}
        </main>
    );
}
