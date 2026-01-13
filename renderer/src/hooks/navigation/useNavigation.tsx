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

    const next = () => {
        if (!songs.length) return;

        if (isUsingShuffle) {
            setShuffledIndex((i) => (i + 1) % shuffledSongs.length);
        } else {
            setSongIndex((i) => (i + 1) % songs.length);
        }
    };

    const prev = () => {
        if (!songs.length) return;

        if (isUsingShuffle) {
            setShuffledIndex((i) => (i - 1 + shuffledSongs.length) % shuffledSongs.length);
        } else {
            setSongIndex((i) => (i - 1 + songs.length) % songs.length);
        }
    };

    const enableShuffle = () => {
        setShuffledSongs(shuffleArray(songs));
        setShuffledIndex(0);
        setIsUsingShuffle(true);
    };

    const disableShuffle = () => {
        setIsUsingShuffle(false);
    };

    const selectSong = (index: number) => {
        if (isUsingShuffle) {
            setShuffledIndex(index);
        } else {
            setSongIndex(index);
        }
    };

    return {
        currentSong,
        shuffledSongs,
        isUsingShuffle,
        next,
        prev,
        enableShuffle,
        disableShuffle,
        selectSong,
    };
}
