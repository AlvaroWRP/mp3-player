import { useEffect, useState } from 'react';
import type { UseAudioPlaybackArgs } from '../../types/types';

export function useAudioPlayback({ audioRef, song }: UseAudioPlaybackArgs) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [coverUrl, setCoverUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!song || !audioRef.current) return;

        let cancelled = false;
        let objectUrl: string | null = null;
        const audio = audioRef.current;

        const loadAndPlay = async () => {
            const result = await window.electronAPI.getSongInfo(song.path);

            if (!result || cancelled) return;

            const { buffer, mime, cover } = result;

            objectUrl = URL.createObjectURL(new Blob([new Uint8Array(buffer)], { type: mime }));

            audio.pause();
            audio.src = objectUrl;
            audio.currentTime = 0;
            audio.load();

            setCoverUrl(cover);
            await audio.play();
            setIsPlaying(true);

            window.electronAPI.setWindowTitle(song.name);
        };
        loadAndPlay();

        return () => {
            cancelled = true;
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [song, audioRef]);

    const play = async () => {
        if (!audioRef.current) return;
        await audioRef.current.play();
        setIsPlaying(true);
    };

    const pause = () => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        setIsPlaying(false);
    };

    const seek = (percent: number, duration: number) => {
        if (!audioRef.current || !duration) return;
        audioRef.current.currentTime = (percent / 100) * duration;
    };

    return { play, pause, seek, isPlaying, coverUrl };
}
