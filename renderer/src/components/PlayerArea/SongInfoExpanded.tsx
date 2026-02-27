import defaultCover from '../../assets/images/default.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { ProgressBar } from './ProgressBar';
import { Buttons } from './Buttons';
import { useEffect } from 'react';
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
}: SongInfoExpandedProps) {
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
            <button
                onClick={handleClose}
                className="absolute top-6 right-8 text-3xl opacity-60 hover:opacity-100 transition"
            >
                <FontAwesomeIcon icon={faClose} />
            </button>
            <div className="relative w-80 h-80 mb-8">
                <img
                    src={coverUrl ?? defaultCover}
                    className="absolute inset-0 w-full h-full object-cover blur-3xl scale-110 opacity-40"
                    draggable={false}
                />
                <img
                    src={coverUrl ?? defaultCover}
                    className="relative w-full h-full object-contain rounded-2xl"
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
            <div className="mt-6">
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
