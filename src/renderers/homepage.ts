document.addEventListener('DOMContentLoaded', async () => {
    let songIndex = 0;
    let songs: { name: string; path: string }[] = [];
    let isMuted = false;

    const currentSongLabel = document.getElementById('current-song')!;

    const updateSongInfo = (songName: string) => {
        currentSongLabel.innerText = songName || 'No song selected';
    };

    const loadSongs = (files: { name: string; path: string }[]) => {
        songs = files;
        songIndex = 0;

        updateSongInfo(songs[songIndex]?.name);
    };

    const playButton = document.getElementById('play-button')!;
    const pauseButton = document.getElementById('pause-button')!;
    const audio = new Audio();

    const playSong = async () => {
        const song = songs[songIndex];

        if (!song) return;

        const { url, cover } = await window.electronAPI.getSongInfo(song.path);

        audio.src = url;
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

    playButton.addEventListener('click', () => {
        playSong();
    });

    pauseButton.addEventListener('click', () => {
        pauseSong();
    });

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
            .toString()
            .padStart(2, '0');
        const secs = Math.floor(seconds % 60)
            .toString()
            .padStart(2, '0');

        return `${mins}:${secs}`;
    };

    const progressBar = document.getElementById('progress-bar') as HTMLInputElement;
    const currentTime = document.getElementById('current-time') as HTMLSpanElement;
    const totalTime = document.getElementById('total-time') as HTMLSpanElement;

    audio.addEventListener('timeupdate', () => {
        currentTime.textContent = formatTime(audio.currentTime);
        totalTime.textContent = formatTime(audio.duration);
        progressBar.value = ((audio.currentTime / audio.duration) * 100 || 0).toString();
    });

    progressBar.addEventListener('input', () => {
        const seekTo = (parseFloat(progressBar.value) / 100) * audio.duration;
        audio.currentTime = seekTo;
    });

    const volumeBar = document.getElementById('volume-bar') as HTMLInputElement;

    volumeBar.addEventListener('input', () => {
        audio.volume = parseFloat(volumeBar.value) / 100;
    });

    const muteButton = document.getElementById('mute-button')!;

    muteButton.addEventListener('click', () => {
        isMuted = !isMuted;
        audio.muted = isMuted;
        muteButton.innerText = isMuted ? '🔇' : '🔊';
    });

    const nextButton = document.getElementById('next-button')!;

    nextButton.addEventListener('click', () => {
        songIndex = (songIndex + 1) % songs.length;

        updateSongInfo(songs[songIndex]?.name);
        playSong();
    });

    const prevButton = document.getElementById('prev-button')!;

    prevButton.addEventListener('click', () => {
        songIndex = (songIndex - 1 + songs.length) % songs.length;

        updateSongInfo(songs[songIndex]?.name);
        playSong();
    });

    const selectFolderButton = document.getElementById('select-folder')!;
    const songList = document.getElementById('song-list')!;

    selectFolderButton.addEventListener('click', async () => {
        const files: { name: string; path: string }[] = await window.electronAPI.selectFolder();

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

        loadSongs(files);
    });
});
