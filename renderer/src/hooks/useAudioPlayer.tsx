import { useAudioElement } from './audio/useAudioElement';
import { useLibrary } from './library/useLibrary';
import { useNavigation } from './navigation/useNavigation';
import { useAudioPlayback } from './audio/useAudioPlayback';
import { useAudioEvents } from './audio/useAudioEvents';
import { useAudioSettings } from './audio/useAudioSettings';
import { useCallback } from 'react';

export function useAudioPlayer() {
    const audioRef = useAudioElement();
    const { songs, selectFolder } = useLibrary();
    const navigation = useNavigation(songs);

    const playback = useAudioPlayback({
        audioRef,
        song: navigation.currentSong,
    });

    const handleEnded = useCallback(() => {
        navigation.skipSong('next');
    }, [navigation]);

    const audioEvents = useAudioEvents(audioRef, handleEnded);
    const audioSettings = useAudioSettings(audioRef);

    const togglePlay = useCallback(() => {
        if (playback.isPlaying) {
            playback.pause();
        } else {
            playback.play();
        }
    }, [playback]);

    const playNext = useCallback(() => {
        navigation.skipSong('next');
    }, [navigation]);

    const playPrevious = useCallback(() => {
        navigation.skipSong('previous');
    }, [navigation]);

    return {
        songs,
        selectFolder,
        togglePlay,
        playNext,
        playPrevious,
        ...navigation,
        ...playback,
        ...audioEvents,
        ...audioSettings,
    };
}
