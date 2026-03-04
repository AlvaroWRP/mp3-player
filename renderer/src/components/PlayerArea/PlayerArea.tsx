import { useState } from 'react';
import { ProgressBar } from './ProgressBar';
import { SongInfo } from './SongInfo';
import { Buttons } from './Buttons';
import { Volume } from './Volume';
import { SongInfoExpanded } from './SongInfoExpanded';
import type { PlayerAreaProps } from '../../types/types';

export function PlayerArea({ audioPlayer }: PlayerAreaProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const {
        currentSong,
        coverUrl,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        play,
        pause,
        skipSong,
        setVolume,
        toggleMute,
        seek,
    } = audioPlayer;

    return (
        <>
            {isExpanded && (
                <SongInfoExpanded
                    currentSong={currentSong}
                    coverUrl={coverUrl}
                    isPlaying={isPlaying}
                    currentTime={currentTime}
                    duration={duration}
                    play={play}
                    pause={pause}
                    skipSong={skipSong}
                    seek={seek}
                    onClose={() => setIsExpanded(false)}
                    volume={volume}
                    isMuted={isMuted}
                    setVolume={setVolume}
                    toggleMute={toggleMute}
                />
            )}
            <footer className="h-24 bg-neutral-800 border-t border-neutral-700 px-6 flex flex-col justify-center gap-3 shadow-[0_-4px_12px_rgba(0,0,0,0.4)]">
                <ProgressBar
                    currentTime={currentTime}
                    seek={seek}
                    duration={duration}
                    isPlaying={isPlaying}
                />
                <div className="relative flex items-center justify-between h-12">
                    <SongInfo
                        coverUrl={coverUrl}
                        currentSong={currentSong}
                        onClick={() => setIsExpanded(true)}
                    />
                    <div className="absolute left-1/2 -translate-x-1/2">
                        <Buttons
                            size="small"
                            skipSong={skipSong}
                            currentSong={currentSong}
                            isPlaying={isPlaying}
                            play={play}
                            pause={pause}
                        />
                    </div>
                    <Volume
                        toggleMute={toggleMute}
                        isMuted={isMuted}
                        setVolume={setVolume}
                        volume={volume}
                    />
                </div>
            </footer>
        </>
    );
}
