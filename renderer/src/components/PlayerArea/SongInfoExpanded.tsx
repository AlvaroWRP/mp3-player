import defaultCover from '../../assets/images/default.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { ProgressBar } from './ProgressBar';
import { Buttons } from './Buttons';
import { useEffect } from 'react';
import { Volume } from './Volume';
import type { SongInfoExpandedProps } from '../../types/types';

export function SongInfoExpanded({
    currentSong,
    coverUrl,
    isPlaying,
    currentTime,
    duration,
    play,
    pause,
    skipSong,
    seek,
    onClose,
    volume,
    isMuted,
    setVolume,
    toggleMute,
}: SongInfoExpandedProps) {
    const isDefaultCover = !coverUrl;

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleClose = () => {
        const el = document.getElementById('expanded-overlay');

        if (!el) return;

        el.classList.add('overlay-exit');
        setTimeout(onClose, 300);
    };

    return (
        <div
            id="expanded-overlay"
            className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex flex-col items-center justify-center text-white overlay-enter"
        >
            <div className="absolute inset-y-0 right-8 flex flex-col items-center">
                <button
                    onClick={handleClose}
                    className="mt-6 text-3xl opacity-60 hover:opacity-100 transition"
                >
                    <FontAwesomeIcon icon={faClose} />
                </button>
                <div className="flex-1 flex items-center justify-center">
                    <Volume
                        size="large"
                        toggleMute={toggleMute}
                        isMuted={isMuted}
                        setVolume={setVolume}
                        volume={volume}
                    />
                </div>
            </div>
            <div className="relative w-80 h-80 mb-10 group">
                {!isDefaultCover && (
                    <>
                        <div
                            className="absolute inset-0 rounded-3xl opacity-60 blur-2xl scale-110 transition-all duration-500 group-hover:scale-115"
                            style={{
                                backgroundImage: `url(${coverUrl})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                        <div className="absolute inset-0 rounded-3xl bg-black/40"></div>
                    </>
                )}
                <img
                    src={coverUrl ?? defaultCover}
                    className={`relative w-full h-full rounded-3xl shadow-2xl transition-all duration-500 ease-out group-hover:scale-105 ${
                        isDefaultCover ? 'object-contain' : 'object-cover'
                    }`}
                    draggable={false}
                />
            </div>
            <h1 className="text-3xl font-semibold mb-6 text-center max-w-2xl truncate">
                {currentSong?.name.replace('.mp3', '') ?? 'No song selected'}
            </h1>
            <div className="w-full max-w-3xl mt-6">
                <ProgressBar
                    currentTime={currentTime}
                    seek={seek}
                    duration={duration}
                    isPlaying={isPlaying}
                ></ProgressBar>
            </div>
            <div className="mt-8">
                <Buttons
                    size="large"
                    skipSong={skipSong}
                    currentSong={currentSong}
                    isPlaying={isPlaying}
                    play={play}
                    pause={pause}
                ></Buttons>
            </div>
        </div>
    );
}
