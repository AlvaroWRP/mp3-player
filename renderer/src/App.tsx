import { SideArea } from './components/SideArea/SideArea';
import { MainArea } from './components/MainArea/MainArea';
import { PlayerArea } from './components/PlayerArea/PlayerArea';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { useEffect, useState } from 'react';
import type { ActiveTab } from './types/types';
import '../index.css';

export function App() {
    const audioPlayer = useAudioPlayer();

    const { songs, currentSongIndex, shuffledSongs, enableShuffle, selectSong, selectFolder } =
        audioPlayer;

    const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
        const saved = localStorage.getItem('activeTab');
        return saved === 'shuffle' ? 'shuffle' : 'library';
    });

    useEffect(() => {
        localStorage.setItem('activeTab', activeTab);
    }, [activeTab]);

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
                    onSongSelect={(index, source) => {
                        selectSong(index, source);
                    }}
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
