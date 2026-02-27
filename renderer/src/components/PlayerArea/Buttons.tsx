import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faBackward, faForward, faPause } from '@fortawesome/free-solid-svg-icons';
import type { ButtonsProps } from '../../types/types';

export function Buttons({ skipSong, currentSong, isPlaying, play, pause, size }: ButtonsProps) {
    const mainSize = size === 'large' ? 'text-3xl p-5' : 'p-3';
    const secondarySize = size === 'large' ? 'text-2xl p-4' : 'p-2';

    return (
        <div className="flex items-center gap-4">
            <button
                onClick={() => {
                    skipSong('previous');
                }}
                className={`${secondarySize} rounded-full transition-all duration-150 ease-out disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-700 hover:scale-110 active:scale-95`}
                disabled={!currentSong}
            >
                <FontAwesomeIcon icon={faBackward} />
            </button>
            <button
                onClick={isPlaying ? pause : play}
                className={`${mainSize} rounded-full bg-neutral-700 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:text-neutral-900 hover:scale-110 active:scale-95 shadow-md`}
                disabled={!currentSong}
            >
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </button>
            <button
                onClick={() => {
                    skipSong('next');
                }}
                className={`${secondarySize} rounded-full transition-all duration-150 ease-out disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-700 hover:scale-110 active:scale-95`}
                disabled={!currentSong}
            >
                <FontAwesomeIcon icon={faForward} />
            </button>
        </div>
    );
}
