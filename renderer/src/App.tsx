import { SideArea } from './components/SideArea/SideArea';
import { MainArea } from './components/MainArea/MainArea';
import { PlayerArea } from './components/PlayerArea/PlayerArea';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { OverlayWindow } from './components/OverlayWindow/OverlayWindow';
import { useCallback, useEffect, useState } from 'react';
import type { ActiveTab } from './types/types';
import '../index.css';

export function App() {
    const isOverlay = window.location.hash === '#/overlay';
    const audioPlayer = useAudioPlayer();

    const {
        songs,
        currentSongIndex,
        shuffledSongs,
        enableShuffle,
        selectSongByPath,
        selectFolder,
        togglePlay,
        playNext,
        playPrevious,
        currentSong,
        coverUrl,
        isPlaying,
    } = audioPlayer;

    const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
        const saved = localStorage.getItem('activeTab');
        return saved === 'shuffle' ? 'shuffle' : 'library';
    });

    const showOverlayWindowTemporarily = useCallback(() => {
        window.electronAPI.showOverlayWindow({
            title: currentSong?.name,
            cover: coverUrl,
            isPlaying,
        });
    }, [currentSong, coverUrl, isPlaying]);

    useEffect(() => {
        localStorage.setItem('activeTab', activeTab);
    }, [activeTab]);

    useEffect(() => {
        if (isOverlay) return;

        const handlePlayPause = () => {
            togglePlay();
        };

        const handleNext = () => {
            playNext();
        };

        const handlePrev = () => {
            playPrevious();
        };

        window.electronAPI.onMediaPlayPause(handlePlayPause);
        window.electronAPI.onMediaNext(handleNext);
        window.electronAPI.onMediaPrev(handlePrev);
    }, [togglePlay, playNext, playPrevious, showOverlayWindowTemporarily, isOverlay]);

    useEffect(() => {
        if (isOverlay) return;
        if (!currentSong) return;

        showOverlayWindowTemporarily();
    }, [isOverlay, currentSong, showOverlayWindowTemporarily]);

    if (isOverlay) {
        return <OverlayWindow></OverlayWindow>;
    }

    return (
        <div className="h-screen w-screen overflow-hidden flex flex-col bg-neutral-900 text-neutral-100">
            <div className="flex flex-1 overflow-hidden">
                <SideArea
                    activeTab={activeTab}
                    onLibraryClick={() => {
                        setActiveTab('library');
                    }}
                    onShuffleClick={() => {
                        setActiveTab('shuffle');
                    }}
                ></SideArea>
                <MainArea
                    activeTab={activeTab}
                    songs={songs}
                    shuffledSongs={shuffledSongs}
                    currentSongIndex={currentSongIndex}
                    onSongSelect={selectSongByPath}
                    onShuffle={() => {
                        enableShuffle();
                        setActiveTab('shuffle');
                    }}
                    onSelectFolder={selectFolder}
                ></MainArea>
            </div>
            <PlayerArea audioPlayer={audioPlayer}></PlayerArea>
        </div>
    );
}
