import { ProgressBar } from './ProgressBar';
import { SongInfo } from './SongInfo';
import { Buttons } from './Buttons';
import { Volume } from './Volume';
import type { PlayerAreaProps } from '../../types/types';

export function PlayerArea({ audioPlayer }: PlayerAreaProps) {
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
        <footer className="h-24 bg-neutral-800 border-t border-neutral-700 px-6 flex flex-col justify-center gap-3 shadow-[0_-4px_12px_rgba(0,0,0,0.4)]">
            <ProgressBar
                currentTime={currentTime}
                seek={seek}
                duration={duration}
                isPlaying={isPlaying}
            ></ProgressBar>
            <div className="relative flex items-center h-12">
                <SongInfo coverUrl={coverUrl} currentSong={currentSong}></SongInfo>
                <Buttons
                    skipSong={skipSong}
                    currentSong={currentSong}
                    isPlaying={isPlaying}
                    play={play}
                    pause={pause}
                ></Buttons>
                <Volume
                    toggleMute={toggleMute}
                    isMuted={isMuted}
                    setVolume={setVolume}
                    volume={volume}
                ></Volume>
            </div>
        </footer>
    );
}
