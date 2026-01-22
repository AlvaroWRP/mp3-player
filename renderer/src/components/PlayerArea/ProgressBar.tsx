import { useEffect, useRef } from 'react';
import { formatTime } from '../../utils/utils';
import type { ProgressBarProps } from '../../types/types';

export function ProgressBar({ currentTime, seek, duration, isPlaying }: ProgressBarProps) {
    const progressCalculation = duration ? (currentTime / duration) * 100 : 0;
    const progressRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isPlaying) return;

        const el = progressRef.current;

        if (!el || !duration) return;

        let rafId: number;
        let visualTime = currentTime;
        let lastTimestamp = performance.now();

        const tick = (now: number) => {
            const delta = (now - lastTimestamp) / 1000;

            lastTimestamp = now;
            visualTime = Math.min(visualTime + delta, duration);

            el.style.setProperty('--progress', `${(visualTime / duration) * 100}%`);
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(rafId);
    }, [currentTime, duration, isPlaying]);

    return (
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
    );
}
