import { useEffect, useState, useRef } from 'react';

export function useAudioSettings(audioRef: React.RefObject<HTMLAudioElement>) {
    const [volume, setVolume] = useState(() => {
        const v = Number(localStorage.getItem('volume'));
        return Number.isFinite(v) ? v : 100;
    });
    const [isMuted, setIsMuted] = useState(false);
    const lastVolumeRef = useRef(volume);
    const setVolumeFix = (v: number) => {
        setVolume(v);

        if (v === 0) {
            setIsMuted(true);
        } else {
            lastVolumeRef.current = v;
            setIsMuted(false);
        }
    };
    const toggleMute = () => {
        setIsMuted((prev) => {
            if (!prev) {
                lastVolumeRef.current = volume > 0 ? volume : lastVolumeRef.current;
                setVolume(0);
                return true;
            } else {
                setVolume(lastVolumeRef.current || 100);
                return false;
            }
        });
    };

    useEffect(() => {
        if (!audioRef.current) return;

        audioRef.current.volume = volume / 100;
        audioRef.current.muted = isMuted;

        localStorage.setItem('volume', volume.toString());
    }, [audioRef, volume, isMuted]);

    return { volume, setVolume: setVolumeFix, isMuted, toggleMute };
}
