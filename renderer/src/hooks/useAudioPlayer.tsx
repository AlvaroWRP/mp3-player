import { useAudioElement } from './audio/useAudioElement';
import { useLibrary } from './library/useLibrary';
import { useNavigation } from './navigation/useNavigation';
import { useAudioPlayback } from './audio/useAudioPlayback';
import { useAudioEvents } from './audio/useAudioEvents';
import { useAudioSettings } from './audio/useAudioSettings';

export function useAudioPlayer() {
    const audioRef = useAudioElement();
    const { songs, selectFolder } = useLibrary();
    const navigation = useNavigation(songs);
    const playback = useAudioPlayback({
        audioRef,
        song: navigation.currentSong,
    });
    const audioEvents = useAudioEvents(audioRef, navigation.next);
    const audioSettings = useAudioSettings(audioRef);

    return { songs, selectFolder, ...navigation, ...playback, ...audioEvents, ...audioSettings };
}
