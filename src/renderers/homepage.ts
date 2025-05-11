document.addEventListener('DOMContentLoaded', async () => {
    const currentSongLabel = document.getElementById('current-song')!;
    const playButton = document.getElementById('play-button')!;
    const pauseButton = document.getElementById('pause-button')!;
    const progressBar = document.getElementById('progress-bar') as HTMLInputElement;
    const currentTime = document.getElementById('current-time') as HTMLSpanElement;
    const totalTime = document.getElementById('total-time') as HTMLSpanElement;
    const volumeBar = document.getElementById('volume-bar') as HTMLInputElement;
    const muteButton = document.getElementById('mute-button')!;
    const volumeValue = document.getElementById('volume-value') as HTMLSpanElement;
    const prevButton = document.getElementById('prev-button')!;
    const nextButton = document.getElementById('next-button')!;
    const selectFolderButton = document.getElementById('select-folder')!;
    const songList = document.getElementById('song-list')!;
    const savedVolume = localStorage.getItem('volume');
    const savedSongs = localStorage.getItem('songs');
    const audio = new Audio();

    const initialVolume = savedVolume !== null ? parseInt(savedVolume, 10) : 100;

    let songIndex = 0;
    let songs: { name: string; path: string }[] = [];
    let isMuted = false;

    const updateSongInfo = (songName: string) => {
        currentSongLabel.innerText = songName.replace('.mp3', '') || 'No song selected';
    };

    const playSong = async () => {
        const song = songs[songIndex];

        if (!song) return;

        const { url, cover } = await window.electronAPI.getSongInfo(song.path);

        if (audio.src !== url) {
            audio.src = url;
        }

        await audio.play();

        updateSongInfo(song.name);

        const songImage = document.getElementById('song-image') as HTMLImageElement;

        if (songImage) {
            songImage.src = cover || '../images/default.png';
        }

        playButton.classList.add('hidden');
        pauseButton.classList.remove('hidden');
    };

    const pauseSong = () => {
        audio.pause();

        playButton.classList.remove('hidden');
        pauseButton.classList.add('hidden');
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
            .toString()
            .padStart(2, '0');
        const secs = Math.floor(seconds % 60)
            .toString()
            .padStart(2, '0');

        return `${mins}:${secs}`;
    };

    const setVolume = (volume: number) => {
        volume = Math.min(100, Math.max(0, volume));

        audio.volume = volume / 100;
        volumeBar.value = volume.toString();
        volumeValue.textContent = volume.toString();

        localStorage.setItem('volume', volume.toString());
    };

    const loadSongs = (files: { name: string; path: string }[]) => {
        songs = files;
        songIndex = 0;

        updateSongInfo(songs[songIndex]?.name);
    };

    const renderSongList = (files: { name: string; path: string }[]) => {
        songList.innerHTML = '';

        files.forEach((file) => {
            const li = document.createElement('li');

            li.innerHTML = `
            <div class="song-item">
                <strong>${file.name.replace('.mp3', '')}</strong><br>
                <small>${file.path}</small>
            </div>
            `;

            li.addEventListener('click', async () => {
                const clickedIndex = songs.findIndex((s) => s.path === file.path);

                if (clickedIndex !== -1) {
                    songIndex = clickedIndex;
                    await playSong();
                }
            });

            songList.appendChild(li);
        });
    };

    playButton.addEventListener('click', () => {
        playSong();
    });

    pauseButton.addEventListener('click', () => {
        pauseSong();
    });

    audio.addEventListener('timeupdate', () => {
        const progressPercent = (audio.currentTime / audio.duration) * 100 || 0;

        if (progressPercent === 100) {
            nextButton.click();
        }

        currentTime.textContent = formatTime(audio.currentTime);
        progressBar.value = ((audio.currentTime / audio.duration) * 100 || 0).toString();

        progressBar.style.setProperty('--progress', `${progressPercent}%`);
    });

    audio.addEventListener('loadedmetadata', () => {
        totalTime.textContent = formatTime(audio.duration);
    });

    progressBar.addEventListener('input', () => {
        const seekTo = (parseFloat(progressBar.value) / 100) * audio.duration;
        audio.currentTime = seekTo;
    });

    volumeBar.addEventListener('input', () => {
        const volume = parseInt(volumeBar.value, 10);
        const volumePercent = (volume / 100) * 100;

        if (audio.muted && volume > 0) {
            audio.muted = false;
            isMuted = false;
            muteButton.innerText = '🔊';
        }

        setVolume(volume);

        volumeBar.style.setProperty('--progress', `${volumePercent}%`);
        muteButton.innerText = audio.volume === 0 ? '🔇' : '🔊';
    });

    muteButton.addEventListener('click', () => {
        isMuted = !isMuted;
        audio.muted = isMuted;
        muteButton.innerText = isMuted ? '🔇' : '🔊';
    });

    prevButton.addEventListener('click', () => {
        songIndex = (songIndex - 1 + songs.length) % songs.length;

        updateSongInfo(songs[songIndex]?.name);
        playSong();
    });

    nextButton.addEventListener('click', () => {
        songIndex = (songIndex + 1) % songs.length;

        updateSongInfo(songs[songIndex]?.name);
        playSong();
    });

    selectFolderButton.addEventListener('click', async () => {
        const files: { name: string; path: string }[] = await window.electronAPI.selectFolder();

        if (files.length > 0) {
            localStorage.setItem('songs', JSON.stringify(files));
        }

        renderSongList(files);
        loadSongs(files);
    });

    if (savedSongs) {
        const parsedSongs = JSON.parse(savedSongs) as { name: string; path: string }[];
        renderSongList(parsedSongs);
        loadSongs(parsedSongs);
    }

    setVolume(initialVolume);
    volumeBar.style.setProperty('--progress', `${initialVolume}%`);
});
