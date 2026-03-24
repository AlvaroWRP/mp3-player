import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import type { OverlayWindowData } from '../../types/types';

export function OverlayWindow() {
    const [data, setData] = useState<OverlayWindowData | null>(null);

    useEffect(() => {
        window.electronAPI.onOverlayWindowData((incoming: OverlayWindowData) => {
            setData(incoming);
        });
    }, []);

    if (!data) return;

    return (
        <div className="w-full h-full flex items-center px-5 py-3 bg-black/75 backdrop-blur-md border-l-4 border-white/30">
            <img
                src={data.cover || '/default.png'}
                className="h-full max-h-[80px] aspect-square rounded-md object-cover mr-4 flex-shrink-0"
            />
            <div className="flex-1 min-w-0 flex flex-col justify-center">
                <p className="text-base font-semibold truncate text-white leading-tight">
                    {data.title}
                </p>
                <p className="text-sm text-neutral-400">Now playing</p>
            </div>
            <div className="ml-4 text-white/90 text-2xl flex items-center">
                <FontAwesomeIcon icon={data.isPlaying ? faPause : faPlay} />
            </div>
        </div>
    );
}
