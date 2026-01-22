import defaultCover from '../../assets/images/default.png';
import type { SongInfoProps } from '../../types/types';

export function SongInfo({ coverUrl, currentSong }: SongInfoProps) {
    return (
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
    );
}
