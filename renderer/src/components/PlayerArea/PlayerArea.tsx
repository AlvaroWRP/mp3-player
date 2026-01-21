import defaultCover from '../../assets/images/default.png';
import { formatTime } from '../../utils/utils';
import type { PlayerAreaProps } from '../../types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlay,
    faBackward,
    faForward,
    faPause,
    faVolumeXmark,
    faVolumeHigh,
} from '@fortawesome/free-solid-svg-icons';
import { useRef, useEffect } from 'react';

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
    const progressCalculation = duration ? (currentTime / duration) * 100 : 0;
    const progressRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const el = progressRef.current;
        if (!el || !duration) return;

        let rafId: number;
        let visualTime = currentTime;
        let lastTs = performance.now();

        const tick = (now: number) => {
            const delta = (now - lastTs) / 1000;
            lastTs = now;

            if (isPlaying) {
                visualTime = Math.min(visualTime + delta, duration);
            } else {
                visualTime = currentTime;
            }

            const progress = (visualTime / duration) * 100;

            el.style.setProperty('--progress', `${progress}%`);
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(rafId);
    }, [currentTime, duration, isPlaying]);

    return (
        <footer className="h-24 bg-neutral-800 border-t border-neutral-700 px-6 flex flex-col justify-center gap-3 shadow-[0_-4px_12px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-3 text-sm">
                <span className="w-10 text-right tabular-nums">{formatTime(currentTime)}</span>
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={progressCalculation}
                    onChange={(e) => seek(Number(e.target.value), duration)}
                    className="flex-1 min-w-0 cursor-pointer progress-bar-style hover:brightness-110"
                    style={{
                        ['--progress' as string]: `${progressCalculation}%`,
                    }}
                    ref={progressRef}
                />
                <span className="w-10 tabular-nums">{formatTime(duration)}</span>
            </div>
            <div className="relative flex items-center h-12">
                <div className="flex items-center gap-3 min-w-0 w-[580px]">
                    <img
                        src={coverUrl ?? defaultCover}
                        className="w-12 h-12 rounded-md object-cover shrink-0 transition-transform duration-200 hover:scale-105"
                        draggable={false}
                    />
                    <span className="font-medium truncate block">
                        {currentSong?.name.replace('.mp3', '') ?? 'No song selected'}
                    </span>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
                    <button
                        onClick={() => {
                            skipSong('previous');
                        }}
                        className="p-2 rounded-full transition-all duration-150 ease-out disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-700 hover:scale-110 active:scale-95"
                        disabled={!currentSong}
                    >
                        <FontAwesomeIcon icon={faBackward} />
                    </button>
                    <button
                        onClick={isPlaying ? pause : play}
                        className="p-3 rounded-full bg-neutral-700 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:text-neutral-900 hover:scale-110 active:scale-95 shadow-md"
                        disabled={!currentSong}
                    >
                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                    </button>
                    <button
                        onClick={() => {
                            skipSong('next');
                        }}
                        className="p-2 rounded-full transition-all duration-150 ease-out disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-700 hover:scale-110 active:scale-95"
                        disabled={!currentSong}
                    >
                        <FontAwesomeIcon icon={faForward} />
                    </button>
                </div>
                <div className="ml-auto flex items-center gap-3 w-[240px] shrink-0 justify-end">
                    <button
                        onClick={toggleMute}
                        className="p-2 rounded-full transition-all duration-150 hover:bg-neutral-700 hover:text-white active:scale-95"
                    >
                        <FontAwesomeIcon icon={isMuted ? faVolumeXmark : faVolumeHigh} />
                    </button>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="w-28 accent-white cursor-pointer hover:accent-neutral-300 transition"
                    />
                    <span className="w-8 text-right tabular-nums">{volume}</span>
                </div>
            </div>
        </footer>
    );
}
