import defaultCover from '../../assets/images/default.png';
import type { SongInfoProps } from '../../types/types';

export function SongInfo({ coverUrl, currentSong, onClick }: SongInfoProps) {
    return (
        <div
            onClick={onClick}
            className="flex items-center gap-3 min-w-0 w-[580px] cursor-pointer group"
        >
            <img
                src={coverUrl ?? defaultCover}
                className="w-12 h-12 rounded-md object-cover shrink-0 transition-transform duration-200 group-hover:scale-110"
                draggable={false}
            />
            <span className="font-medium truncate block group-hover:text-blue-400 transition-colors">
                {currentSong?.name.replace('.mp3', '') ?? 'No song selected'}
            </span>
        </div>
    );
}
