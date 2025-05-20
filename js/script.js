const container = document.querySelector(".container"),
      musicImg = container.querySelector(".img-area img"),
      musicName = container.querySelector(".song-details  .name"),
      musicArtist = container.querySelector(".song-details .artist"),
      mainAudio = document.querySelector("#main-audio"),
      playPauseBtn = container.querySelector(".play-pause"),
      playIcon = playPauseBtn.querySelector("i"),
      prevBtn = container.querySelector("#prev"),
      nextBtn = container.querySelector("#next"),
      musicList = container.querySelector(".music-list");
      moreMusicBtn = container.querySelector("#more-music "),
      closemoreMusic = container.querySelector("#close");;

      moreMusicBtn.addEventListener("click", () =>{
        musicList.classList.toggle("show");
      });
      closemoreMusic.addEventListener("click", () =>{
        moreMusicBtn.click();
      });

let musicIndex = 1;

// Load music initially
window.addEventListener("load", () => {
  loadMusic(musicIndex);
  loadMusicList();
  playingSong();
});

function loadMusic(indexN) {
  const music = allMusic[indexN - 1];
  musicName.innerText = music.name;
  musicArtist.innerText = music.artist;
  musicImg.src = `images/${music.img}.jpg`;
  mainAudio.src = `songs/${music.src}.mp3`;
}

function playMusic() {
  container.classList.add("paused");
  playIcon.innerText = "pause";
  mainAudio.play();
}

function pauseMusic() {
  container.classList.remove("paused");
  playIcon.innerText = "play_arrow";
  mainAudio.pause();
}

function nextMusic() {
  musicIndex++;
  if (musicIndex > allMusic.length) musicIndex = 1;
  loadMusic(musicIndex);
  playMusic();
}

function prevMusic() {
  musicIndex--;
  if (musicIndex < 1) musicIndex = allMusic.length;
  loadMusic(musicIndex);
  playMusic();
}

playPauseBtn.addEventListener("click", () => {
  const isMusicPaused = container.classList.contains("paused");
  isMusicPaused ? pauseMusic() : playMusic();
});

nextBtn.addEventListener("click", nextMusic);
prevBtn.addEventListener("click", prevMusic);
// Load the music list dynamically
function loadMusicList() {
  musicListUl.innerHTML = ""; // Clear existing list
  allMusic.forEach((music, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <div class="row">
        <span>${music.name}</span>
        <p>${music.artist}</p>
      </div>
      <span class="audio-duration">--:--</span>
      <audio class="list-audio" src="songs/${music.src}.mp3"></audio>
    `;
    li.setAttribute("data-index", index + 1);

    // Play song on click
    li.addEventListener("click", function () {
      musicIndex = index + 1;
      loadMusic(musicIndex);
      playMusic();
      musicListWrapper.classList.remove("show");
    });

    // Get and show song duration
    const audio = li.querySelector(".list-audio");
    const durationSpan = li.querySelector(".audio-duration");
    audio.addEventListener("loadedmetadata", () => {
      const duration = audio.duration;
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60).toString().padStart(2, "0");
      durationSpan.innerText = `${minutes}:${seconds}`;
    });

    musicListUl.appendChild(li);
  });
}
const progressArea = document.querySelector(".progress-area");
const progressBar = document.querySelector(".progress-bar");
const currentTimeEl = document.querySelector(".current-time");
const durationEl = document.querySelector(".maximum-duration");

// Update progress bar as song plays
mainAudio.addEventListener("timeupdate", () => {
  let currentTime = mainAudio.currentTime;
  let duration = mainAudio.duration;

  let progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;

  currentTimeEl.innerText = formatTime(currentTime);
  durationEl.innerText = formatTime(duration);
});

// Click to seek
progressArea.addEventListener("click", (e) => {
  const progressWidth = progressArea.clientWidth;
  const offsetX = e.offsetX;
  const duration = mainAudio.duration;

  mainAudio.currentTime = (offsetX / progressWidth) * duration;
  playMusic();
});

// Format time (mm:ss)
function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

for(let i=0; i < allMusic.length; i++) {
    let liTag =`<li li-index="${i+1}>
        <div class="row">
            <span>${allMusic[i].name}</span>
            <p>${allMusic[i].artist}</p>
        </div>
        <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
        <span id="${allMusic[i].src}" class="audio-duration">1:45</span>
    </li>`;
    ulTag.insertAdjacentHTML("beforeend" , liTag);

    let liAudioDurationTag = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

    liAudiotag.addEventListener("loadeddata" , () =>{
       let liAudiotag = li.querySelector(".list-audio");
      let liAudioDurationTag = li.querySelector(".audio-duration");
      let duration = liAudiotag.duration;
      let minutes = Math.floor(duration / 60);
      let seconds = Math.floor(duration % 60).toString().padStart(2, "0");
      if (seeconds <10){
        seconds=`0${seconds}`;
    }
      liAudioDurationTag.innerText = `${minutes}:${seconds}`;
});
}
const allLiTags = ulTag.querySelectorAll("li") ;
function playingSong(){
    for (let j=0; j< allLiTags.length; j++){
        let audioTag = allLiTags[j].querySelector(".audio-duration")
        if(allliTags[j].classList.contains("playing")){
            allLiTags[j].classList.remove("playing");
        }
        if(allliTags[j].getAttribute("li-index") ==musicIndex){
            allLiTags[j].classList.add("playing");
            audioTag.innerText= "playing";
        }
        allLiTags[j].setAttribute("onclick", "clicked(this)");
    }
}
function clicked(element){
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}
