import { useEffect, useState, useRef } from 'react';

const defaultVolume = 50;

export function useAudioSettings(audioRef: React.RefObject<HTMLAudioElement>) {
    const [volume, setVolume] = useState(() => {
        const v = Number(localStorage.getItem('volume'));
        return Number.isFinite(v) ? v : defaultVolume;
    });

    const [isMuted, setIsMuted] = useState(() => {
        return localStorage.getItem('isMuted') === 'true';
    });

    const lastVolumeRef = useRef(
        Number(localStorage.getItem('lastVolume')) || volume || defaultVolume,
    );

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
            }

            setVolume(lastVolumeRef.current || defaultVolume);
            return false;
        });
    };

    useEffect(() => {
        if (!audioRef.current) return;

        audioRef.current.volume = volume / 100;
        audioRef.current.muted = isMuted;

        localStorage.setItem('volume', volume.toString());
        localStorage.setItem('isMuted', String(isMuted));
        localStorage.setItem('lastVolume', String(lastVolumeRef.current));
    }, [audioRef, volume, isMuted]);

    return { volume, setVolume: setVolumeFix, isMuted, toggleMute };
}
