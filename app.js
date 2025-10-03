console.log("Welcome to Jam Vibe");

// Initialize
let songIndex = 0;
let audioElement = new Audio('song1.mp3');
let masterplay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let currentTimeSpan = document.getElementById('currentTime');
let totalDurationSpan = document.getElementById('totalDuration');
let masterSongName = document.querySelector('.masterSongName');
let volumeBar = document.getElementById('volumeBar');
let volumeIcon = document.getElementById('volumeIcon');

// Set default volume
audioElement.volume = 0.5;
volumeBar.value = audioElement.volume * 100;

// Songs array
let songs = [
  { songName:"May be the Last Time", filePath:"song1.mp3", coverPath:"artist1.jpg", duration:"4:29" },
  { songName:"Find a Way", filePath:"song2.mp3", coverPath:"artist2.jpg", duration:"2:45" },
  { songName:"Last Song", filePath:"song3.mp3", coverPath:"artist3.jpg", duration:"4:11" },
  { songName:"Give Yourself Away", filePath:"song4.mp3", coverPath:"artist4.jpg", duration:"3:39" },
  { songName:"Around The Corner", filePath:"song5.mp3", coverPath:"artist5.jpg", duration:"1:44" },
  { songName:"Medicine Man", filePath:"song6.mp3", coverPath:"artist6.jpg", duration:"2:56" },
  { songName:"Luka Chupi", filePath:"song7.mp3", coverPath:"artist7.jpg", duration:"0:13" }
];

// Fill song items
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  element.getElementsByClassName("songDuration")[0].innerText = songs[i].duration;
});

// Master play/pause
masterplay.addEventListener('click', () => {
  if(audioElement.paused || audioElement.currentTime <= 0){
    audioElement.play();
    masterplay.classList.replace('fa-circle-play','fa-circle-pause');
    gif.style.opacity = 1;
    updateSongItemPlayIcon();
  } else {
    audioElement.pause();
    masterplay.classList.replace('fa-circle-pause','fa-circle-play');
    gif.style.opacity = 0;
    updateSongItemPlayIcon();
  }
});

// Format time
function formatTime(seconds){
  if(isNaN(seconds) || seconds < 0) return "0:00";
  let mins = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);
  if(secs < 10) secs = "0"+secs;
  return `${mins}:${secs}`;
}

// Update progress
audioElement.addEventListener('timeupdate', () => {
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100) || 0;
  myProgressBar.value = progress;
  currentTimeSpan.innerText = formatTime(audioElement.currentTime);
});

// Seek
myProgressBar.addEventListener('input', () => {
  audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
});

// Reset all song play buttons
function resetSongItemPlays(){
  document.querySelectorAll('.songItemPlay').forEach(el=>{
    el.classList.replace('fa-circle-pause','fa-circle-play');
  });
}

// Update current song icon
function updateSongItemPlayIcon(){
  resetSongItemPlays();
  if(!audioElement.paused){
    let currentItem = songItems[songIndex];
    currentItem.querySelector('.songItemPlay').classList.replace('fa-circle-play','fa-circle-pause');
  }
}

// Play individual song
document.querySelectorAll('.songItemPlay').forEach((element,i)=>{
  element.addEventListener('click', ()=>{
    songIndex = i;
    playSong(songIndex);
  });
});

// Play song
function playSong(index){
  audioElement.src = songs[index].filePath;
  audioElement.currentTime = 0;
  audioElement.play();
  masterSongName.innerText = songs[index].songName;
  totalDurationSpan.innerText = songs[index].duration;
  currentTimeSpan.innerText = "0:00";
  masterplay.classList.replace('fa-circle-play','fa-circle-pause');
  gif.style.opacity = 1;
  updateSongItemPlayIcon();
}

// Next/Previous
document.getElementById('next').addEventListener('click', ()=>{
  songIndex = (songIndex + 1) % songs.length;
  playSong(songIndex);
});
document.getElementById('previous').addEventListener('click', ()=>{
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playSong(songIndex);
});

// Volume control
volumeBar.addEventListener('input', ()=>{
  audioElement.volume = volumeBar.value / 100;
  volumeIcon.style.color = audioElement.muted ? 'red' : '#fff';
});
volumeIcon.addEventListener('click', ()=>{
  audioElement.muted = !audioElement.muted;
  volumeIcon.style.color = audioElement.muted ? 'red' : '#fff';
});

// Dark mode toggle
document.getElementById('toggleDark').addEventListener('click', ()=>{
  document.body.classList.toggle('dark');
});

// Smooth scroll navbar
document.querySelectorAll('.nav-link').forEach(link=>{
  link.addEventListener('click', e=>{
    e.preventDefault();
    const targetID = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetID);
    targetElement.scrollIntoView({behavior:'smooth'});
  });
});

// Active navbar on scroll
const sections = document.querySelectorAll('body > div, #top');
const navLinks = document.querySelectorAll('.nav-link');
function removeActive(){ navLinks.forEach(link=>link.classList.remove('active')); }
window.addEventListener('scroll', ()=>{
  let scrollY = window.pageYOffset;
  sections.forEach(section=>{
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 70;
    const sectionID = section.getAttribute('id');
    if(scrollY >= sectionTop && scrollY < sectionTop + sectionHeight){
      removeActive();
      if(sectionID){
        const activeLink = document.querySelector(`.nav-link[href="#${sectionID}"]`);
        if(activeLink) activeLink.classList.add('active');
      }
    }
  });
});


