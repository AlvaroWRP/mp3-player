document.addEventListener('DOMContentLoaded', async () => {
    const currentSongLabel = document.getElementById('current-song')!;
    const playButton = document.getElementById('play-button')!;
    const pauseButton = document.getElementById('pause-button')!;
    const progressBar = document.getElementById('progress-bar') as HTMLInputElement;
    const currentTime = document.getElementById('current-time') as HTMLSpanElement;
    const totalTime = document.getElementById('total-time') as HTMLSpanElement;
    const volumeBar = document.getElementById('volume-bar') as HTMLInputElement;
    const muteButton = document.getElementById('mute-button')!;
    const volumeIcon = document.getElementById('volume-icon');
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

        localStorage.setItem('selectedSongIndex', songIndex.toString());
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

    const updateVolumeIcon = () => {
        if (!volumeIcon) return;

        if (audio.muted || audio.volume === 0) {
            volumeIcon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <line x1="18" y1="9" x2="22" y2="13" />
                    <line x1="22" y1="9" x2="18" y2="13" />
                </svg>
            `;
        } else {
            volumeIcon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
            `;
        }
    };

    const loadSongs = (files: { name: string; path: string }[]) => {
        songs = files;

        updateSongInfo(songs[songIndex]?.name);

        localStorage.setItem('selectedSongIndex', songIndex.toString());
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

        currentTime.textContent = formatTime(audio.currentTime);
        progressBar.value = ((audio.currentTime / audio.duration) * 100 || 0).toString();

        progressBar.style.setProperty('--progress', `${progressPercent}%`);
    });

    audio.addEventListener('loadedmetadata', () => {
        totalTime.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('ended', () => {
        nextButton.click();
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
        }

        setVolume(volume);
        updateVolumeIcon();

        volumeBar.style.setProperty('--progress', `${volumePercent}%`);
    });

    muteButton.addEventListener('click', () => {
        isMuted = !isMuted;
        audio.muted = isMuted;

        updateVolumeIcon();
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
        const savedIndex = parseInt(localStorage.getItem('selectedSongIndex') || '0', 10);

        if (!isNaN(savedIndex) && parsedSongs[savedIndex]) {
            songIndex = savedIndex;
        }

        renderSongList(parsedSongs);
        loadSongs(parsedSongs);
        updateSongInfo(parsedSongs[savedIndex].name);
    }

    setVolume(initialVolume);
    updateVolumeIcon();

    volumeBar.style.setProperty('--progress', `${initialVolume}%`);
});
