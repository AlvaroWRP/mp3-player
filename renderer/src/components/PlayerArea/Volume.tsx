import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeXmark, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import type { VolumeProps } from '../../types/types';

export function Volume({ toggleMute, isMuted, setVolume, volume }: VolumeProps) {
    return (
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
    );
}
