import { Header } from './Header';
import { EmptyState } from './EmptyState';
import { SongsRenderer } from './SongsRenderer';
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
    const isLibraryEmpty = activeTab === 'library' && songs.length === 0;
    const isShuffleEmpty = activeTab === 'shuffle' && shuffledSongs.length === 0;

    return (
        <main className="flex flex-col flex-1 overflow-y-auto px-6">
            <Header
                activeTab={activeTab}
                songs={songs}
                onShuffle={onShuffle}
                onSelectFolder={onSelectFolder}
            ></Header>
            {isLibraryEmpty ? (
                <EmptyState
                    title="No songs selected"
                    subtitle={
                        <>
                            Click <span className="text-white">Select folder</span> to add mp3 files
                        </>
                    }
                ></EmptyState>
            ) : isShuffleEmpty ? (
                <EmptyState
                    title="No shuffled songs yet"
                    subtitle={
                        <>
                            Click <span className="text-white">Shuffle</span> to generate a shuffled
                            list
                        </>
                    }
                ></EmptyState>
            ) : (
                <SongsRenderer
                    activeTab={activeTab}
                    songs={songs}
                    shuffledSongs={shuffledSongs}
                    currentSongIndex={currentSongIndex}
                    onSongSelect={onSongSelect}
                ></SongsRenderer>
            )}
        </main>
    );
}
