import type { useAudioPlayer } from '../hooks/useAudioPlayer';

export type Song = {
    name: string;
    path: string;
};

export type MainAreaProps = {
    activeTab: 'library' | 'shuffle';
    songs: Song[];
    shuffledSongs: Song[];
    onSongSelect: (index: number) => void;
    onShuffle: () => void;
    onSelectFolder: () => void;
};

export type PlayerAreaProps = {
    audioPlayer: ReturnType<typeof useAudioPlayer>;
};

export type SideAreaProps = {
    activeTab: 'library' | 'shuffle';
    onLibraryClick: () => void;
    onShuffleClick: () => void;
};

export type UseAudioPlaybackArgs = {
    audioRef: React.RefObject<HTMLAudioElement>;
    song: Song | undefined;
};

export type ActiveTab = 'library' | 'shuffle';
