import type { ReactNode, RefObject } from 'react';
import type { useAudioPlayer } from '../hooks/useAudioPlayer';

export type Song = Readonly<{
    name: string;
    path: string;
}>;

export type ActiveTab = 'library' | 'shuffle';

type BaseMainAreaProps = {
    activeTab: ActiveTab;
    songs: Song[];
};

export type MainAreaProps = BaseMainAreaProps & {
    shuffledSongs: Song[];
    currentSongIndex: number;
    onSongSelect: (songPath: string, source: ActiveTab) => void;
    onShuffle: () => void;
    onSelectFolder: () => void;
};

export type HeaderProps = BaseMainAreaProps & {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    onShuffle: () => void;
    onSelectFolder: () => void;
};

export type EmptyStateProps = {
    title: string;
    subtitle: ReactNode;
};

export type SearchBarProps = Pick<HeaderProps, 'searchQuery' | 'onSearchChange'>;

export type SongsRendererProps = BaseMainAreaProps & {
    shuffledSongs: Song[];
    currentSongIndex: number;
    onSongSelect: (songPath: string, source: ActiveTab) => void;
};

export type PlayerAreaProps = {
    audioPlayer: ReturnType<typeof useAudioPlayer>;
};

export type ProgressBarProps = {
    currentTime: number;
    duration: number;
    isPlaying: boolean;
    seek: (percentage: number, duration: number) => void;
};

export type SongInfoProps = {
    coverUrl: string | null;
    currentSong: Song | null;
    onClick: () => void;
};

export type SongInfoExpandedProps = {
    currentSong: Song | null;
    coverUrl: string | null;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    play: () => void;
    pause: () => void;
    skipSong: (button: 'previous' | 'next') => void;
    seek: (percentage: number, duration: number) => void;
    onClose: () => void;
};

export type ButtonsProps = {
    currentSong: Song | null;
    isPlaying: boolean;
    size: 'small' | 'large';
    play: () => void;
    pause: () => void;
    skipSong: (button: 'previous' | 'next') => void;
};

export type VolumeProps = {
    volume: number;
    isMuted: boolean;
    setVolume: (volume: number) => void;
    toggleMute: () => void;
};

export type SideAreaProps = {
    activeTab: ActiveTab;
    onLibraryClick: () => void;
    onShuffleClick: () => void;
};

export type TabItemProps = {
    onClick: () => void;
    isActive: boolean;
    colorClass: string;
    tabName: string;
};

export type UseAudioPlaybackArgs = {
    audioRef: RefObject<HTMLAudioElement>;
    song?: Song;
};

export type PersistedStates = {
    songIndex: number;
    shuffledIndex: number;
    isUsingShuffle: boolean;
    shuffledOrder: string[];
};
