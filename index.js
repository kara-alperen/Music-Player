const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'img-mp3/The Neighbourhood  The Beach.mp3',
        displayName: 'The Beach',
        cover: 'img-mp3/The N.jpg',
        artist: 'The Neighbourhood',
    },
    {
        path: 'img-mp3/Bedroom  In My Head.mp3',
        displayName: 'In My Head',
        cover: 'img-mp3/Bedroom.jpg',
        artist: 'Bedroom',
    },
    {
        path: 'img-mp3/Current Joys  A Different Age.mp3',
        displayName: 'A Different Age',
        cover: 'img-mp3/Current.jpg',
        artist: 'Current Joys',
    },
    {
        path: 'img-mp3/The Irrepressibles In This Shirt.mp3',
        displayName: 'In This Shirt',
        cover: 'img-mp3/In This.jpg',
        artist: 'The Irrepressibles',
    },
    {
        path: 'img-mp3/Apparat  Goodbye .mp3',
        displayName: 'Goodbyeh',
        cover: 'img-mp3/Apparat.jpg',
        artist: 'Apparat',
    }
];


let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    
    playBtn.classList.replace('fa-play', 'fa-pause');
    
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    
    playBtn.classList.replace('fa-pause', 'fa-play');
    
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);