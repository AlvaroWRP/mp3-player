import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeXmark, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import type { VolumeProps } from '../../types/types';

export function Volume({ toggleMute, isMuted, setVolume, volume, size = 'small' }: VolumeProps) {
    if (size === 'large') {
        return (
            <div className="flex flex-col items-center gap-8">
                <button
                    onClick={toggleMute}
                    className="p-3 rounded-full bg-neutral-800/60 backdrop-blur hover:bg-neutral-700 transition-all duration-200 active:scale-95"
                >
                    <FontAwesomeIcon
                        className="text-lg"
                        icon={isMuted ? faVolumeXmark : faVolumeHigh}
                    />
                </button>
                <div className="relative h-40 flex items-center justify-center group">
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="absolute w-48 h-2 -rotate-90 appearance-none cursor-pointer rounded-full transition-all duration-200"
                        style={{
                            background: `linear-gradient(to right, ${volume > 0 ? '#e5e5e5' : '#a3a3a3'} ${volume}%, #262626 ${volume}%)`,
                        }}
                    />
                </div>
                <span className="text-sm tabular-nums">{volume}</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3">
            <button
                onClick={toggleMute}
                className="p-2 rounded-full transition-all duration-150 hover:bg-neutral-700 hover:text-white active:scale-95"
            >
                <FontAwesomeIcon icon={isMuted ? faVolumeXmark : faVolumeHigh} />
            </button>
            <div className="group flex items-center">
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-28 h-2 appearance-none cursor-pointer rounded-full transition-all duration-200"
                    style={{
                        background: `linear-gradient(to right, #e5e5e5 ${volume}%, #404040 ${volume}%)`,
                    }}
                />
            </div>
            <span className="w-8 text-right tabular-nums">{volume}</span>
        </div>
    );
}
