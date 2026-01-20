import { useMemo, useState } from 'react';
import type { Song } from '../../types/types';
import { shuffleArray } from './useShuffle';

export function useNavigation(songs: Song[]) {
    const [songIndex, setSongIndex] = useState(0);
    const [shuffledSongs, setShuffledSongs] = useState<Song[]>([]);
    const [shuffledIndex, setShuffledIndex] = useState(0);
    const [isUsingShuffle, setIsUsingShuffle] = useState(false);

    const currentSong = useMemo(
        () => (isUsingShuffle ? shuffledSongs[shuffledIndex] : songs[songIndex]),
        [songs, shuffledSongs, songIndex, shuffledIndex, isUsingShuffle],
    );

    const currentSongIndex = isUsingShuffle ? shuffledIndex : songIndex;

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

    const selectSong = (index: number, source: 'library' | 'shuffle') => {
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
