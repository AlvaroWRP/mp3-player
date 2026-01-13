import defaultCover from '../../assets/images/default.png';
import { formatTime } from '../../utils/utils';
import type { PlayerAreaProps } from '../../types/types';

export function PlayerArea({ audioPlayer }: PlayerAreaProps) {
    const {
        currentSong,
        coverUrl,
        isPlaying,
        currentTime,
        duration,
        volume,
        play,
        pause,
        next,
        prev,
        setVolume,
        toggleMute,
        seek,
    } = audioPlayer;

    return (
        <div>
            <div>
                <span>{formatTime(currentTime)}</span>
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={duration ? (currentTime / duration) * 100 : 0}
                    onChange={(e) => seek(Number(e.target.value), duration)}
                />
                <span>{formatTime(duration)}</span>
            </div>
            <div>
                <div>
                    <img src={coverUrl ?? defaultCover} />
                    <span>{currentSong?.name.replace('.mp3', '') ?? 'No song selected'}</span>
                </div>
                <div>
                    <button onClick={prev}>◀</button>
                    {!isPlaying ? (
                        <button onClick={play}>▶</button>
                    ) : (
                        <button onClick={pause}>⏸</button>
                    )}
                    <button onClick={next}>▶▶</button>
                </div>
                <div>
                    <button onClick={toggleMute}>🔈</button>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                    />
                    <span>{volume}</span>
                </div>
            </div>
        </div>
    );
}
