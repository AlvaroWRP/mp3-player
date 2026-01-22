import { useEffect, useMemo, useState } from 'react';
import { shuffleArray } from './useShuffle';
import type { Song, PersistedStates, ActiveTab } from '../../types/types';

export function useNavigation(songs: Song[]) {
    const persistedStates = useMemo<PersistedStates | null>(() => {
        const raw = localStorage.getItem('persistedStates');
        return raw ? JSON.parse(raw) : null;
    }, []);

    const [songIndex, setSongIndex] = useState(() => persistedStates?.songIndex ?? 0);
    const [shuffledIndex, setShuffledIndex] = useState(() => persistedStates?.shuffledIndex ?? 0);

    const [shuffledSongs, setShuffledSongs] = useState<Song[]>(() => {
        if (!persistedStates?.shuffledOrder.length) return [];

        return persistedStates.shuffledOrder
            .map((path) => songs.find((s) => s.path === path))
            .filter(Boolean) as Song[];
    });

    const [isUsingShuffle, setIsUsingShuffle] = useState(
        () => persistedStates?.isUsingShuffle ?? false,
    );

    const currentSong = useMemo(
        () => (isUsingShuffle ? shuffledSongs[shuffledIndex] : songs[songIndex]),
        [songs, shuffledSongs, songIndex, shuffledIndex, isUsingShuffle],
    );

    const currentSongIndex = isUsingShuffle ? shuffledIndex : songIndex;

    useEffect(() => {
        if (!songs.length) return;

        const state = {
            songIndex,
            shuffledIndex,
            isUsingShuffle,
            shuffledOrder: shuffledSongs.map((s) => s.path),
        };

        localStorage.setItem('persistedStates', JSON.stringify(state));
    }, [songIndex, shuffledIndex, isUsingShuffle, shuffledSongs, songs]);

    const skipSong = (button: 'previous' | 'next') => {
        if (!songs.length) return;

        if (button === 'previous') {
            if (isUsingShuffle) {
                setShuffledIndex((i) => (i - 1 + shuffledSongs.length) % shuffledSongs.length);
            } else {
                setSongIndex((i) => (i - 1 + songs.length) % songs.length);
            }
        } else {
            if (isUsingShuffle) {
                setShuffledIndex((i) => (i + 1) % shuffledSongs.length);
            } else {
                setSongIndex((i) => (i + 1) % songs.length);
            }
        }
    };

    const enableShuffle = () => {
        if (!songs.length) return;

        setShuffledSongs(shuffleArray(songs));
        setShuffledIndex(0);
        setIsUsingShuffle(true);
    };

    const disableShuffle = () => {
        setIsUsingShuffle(false);
    };

    const selectSong = (index: number, source: ActiveTab) => {
        if (source === 'shuffle') {
            setIsUsingShuffle(true);
            setShuffledIndex(index);
        } else {
            setIsUsingShuffle(false);
            setSongIndex(index);
        }
    };

    return {
        currentSong,
        currentSongIndex,
        shuffledSongs,
        isUsingShuffle,
        skipSong,
        enableShuffle,
        disableShuffle,
        selectSong,
    };
}
