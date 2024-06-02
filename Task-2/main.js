const musicLibrary = [
    { 
        title: "Song 1", 
        artist: "Artist 1", 
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", 
        cover: "https://cdn6.aptoide.com/imgs/b/7/4/b7465d61b603ee7bd3ed3190fd54545e_icon.png?w=128" 
    },
    { 
        title: "Song 2", 
        artist: "Artist 2", 
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", 
        cover: "https://www.codester.com/static/uploads/items/000/036/36378/icon.png" 
    },
    { 
        title: "Song 3", 
        artist: "Artist 3", 
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", 
        cover: "https://play-lh.googleusercontent.com/clAGocKFJ-3x-ctFYbEcTu8TFHfcE1K-6yaAvZ4Hba-KrTT0GYWFk8bfG6EEeEDmaw=w600-h300-pc0xffffff-pd" 
    }
];

let playlists = [];
let currentTrackIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

document.addEventListener("DOMContentLoaded", function() {
    loadMusicLibrary();
    loadPlaylists();
    document.getElementById('audioPlayer').addEventListener('timeupdate', updateProgressBar);
    document.getElementById('audioPlayer').addEventListener('ended', handleTrackEnd);
});

function loadMusicLibrary() {
    const musicLibraryElement = document.getElementById('musicLibrary');
    musicLibrary.forEach((track, index) => {
        const trackElement = document.createElement('li');
        trackElement.className = 'list-group-item';
        trackElement.textContent = `${track.title} - ${track.artist}`;
        trackElement.onclick = () => playTrack(index);
        musicLibraryElement.appendChild(trackElement);
    });
}

function loadPlaylists() {
    const playlistsElement = document.getElementById('playlists');
    playlistsElement.innerHTML = '';
    playlists.forEach((playlist, index) => {
        const playlistElement = document.createElement('li');
        playlistElement.className = 'list-group-item';
        playlistElement.textContent = playlist.name;
        playlistsElement.appendChild(playlistElement);
    });
}

function createPlaylist() {
    const playlistName = prompt("Enter playlist name:");
    if (playlistName) {
        playlists.push({ name: playlistName, tracks: [] });
        loadPlaylists();
    }
}

function playTrack(index) {
    currentTrackIndex = index;
    const track = musicLibrary[index];
    document.getElementById('trackTitle').textContent = track.title;
    document.getElementById('artistName').textContent = track.artist;
    document.getElementById('albumCover').src = track.cover;
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = track.src;
    audioPlayer.play();
    isPlaying = true;
}

function playPauseTrack() {
    const audioPlayer = document.getElementById('audioPlayer');
    if (isPlaying) {
        audioPlayer.pause();
    } else {
        audioPlayer.play();
    }
    isPlaying = !isPlaying;
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex > 0) ? currentTrackIndex - 1 : musicLibrary.length - 1;
    playTrack(currentTrackIndex);
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex < musicLibrary.length - 1) ? currentTrackIndex + 1 : 0;
    playTrack(currentTrackIndex);
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    alert(`Shuffle is now ${isShuffle ? "on" : "off"}`);
}

function toggleRepeat() {
    isRepeat = !isRepeat;
    alert(`Repeat is now ${isRepeat ? "on" : "off"}`);
}

function changeVolume() {
    const audioPlayer = document.getElementById('audioPlayer');
    const volumeControl = document.getElementById('volumeControl');
    audioPlayer.volume = volumeControl.value;
}

function updateProgressBar() {
    const audioPlayer = document.getElementById('audioPlayer');
    const progressBar = document.getElementById('progressBar');
    const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = `${percentage}%`;
}

function handleTrackEnd() {
    if (isRepeat) {
        playTrack(currentTrackIndex);
    } else if (isShuffle) {
        currentTrackIndex = Math.floor(Math.random() * musicLibrary.length);
        playTrack(currentTrackIndex);
    } else {
        nextTrack();
    }
}
