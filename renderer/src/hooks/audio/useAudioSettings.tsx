import { useEffect, useState } from 'react';

export function useAudioSettings(audioRef: React.RefObject<HTMLAudioElement>) {
    const [volume, setVolume] = useState(() => {
        const v = Number(localStorage.getItem('volume'));
        return Number.isFinite(v) ? v : 100;
    });
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (!audioRef.current) return;

        audioRef.current.volume = volume / 100;
        audioRef.current.muted = isMuted;

        localStorage.setItem('volume', volume.toString());
    }, [audioRef, volume, isMuted]);

    const toggleMute = () => {
        setIsMuted((m) => !m);
    };

    return { volume, setVolume, isMuted, toggleMute };
}
