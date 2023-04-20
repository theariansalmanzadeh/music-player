const playPause = document.querySelector(".play-control");
const playingIcon = document.querySelector("#play-pause");
const preveMusic = document.querySelector("#prevese");
const nextMusic = document.querySelector("#next");
const musicTrack = document.querySelector("audio");
const progressBar = document.querySelector(".progress");
const currentTime = document.querySelector("#current-time");
const TotalTimeLeft = document.querySelector("#total-duration");
const playList = document.querySelector(".play-list");
const progressBarConainer = document.querySelector(".progress-container");
const artist = document.querySelector(".music-artist");
const image = document.querySelector(".music-img");
const imageContainer = document.querySelector(".img-container");
const darkMode = document.querySelector(".light-mode");
const modeSwitch = document.querySelector(".mode-wrapper");

Object.freeze(
  (modeState = {
    night: 1,
    day: 2,
  })
);
let currentMode = modeState.day;

const songs = [
  {
    name: "jacinto-1",
    artist: "jacinto",
    img: "jacinto-1",
  },
  {
    name: "jacinto-2",
    artist: "jacinto",
    img: "jacinto-2",
  },
  {
    name: "jacinto-3",
    artist: "jacinto",
    img: "jacinto-3",
  },
  {
    name: "metric-1",
    artist: "jacinto",
    img: "metric-1",
  },
];

let currentMusic = 0;

const changeIcon = function () {
  let icon = playingIcon.classList[1].split("-");

  if (icon.includes("play")) {
    musicTrack.play();
    playingIcon.classList.remove("fa-play-circle");
    icon[1] = "pause";
  } else if (icon.includes("pause")) {
    musicTrack.pause();
    playingIcon.classList.remove("fa-pause-circle");
    icon[1] = "play";
  }
  icon = icon.join("-");
  playingIcon.classList.add(icon);
};
const MusicTimeSeek = function (newTime) {
  const musicSeekRatio = newTime * musicTrack.duration;
  console.log(musicSeekRatio);
  return musicSeekRatio / 100;
};

const changeMusic = function () {
  currentMusic > 3 ? (currentMusic = 0) : currentMusic;
  musicTrack.src = `music/${songs[currentMusic].name}.mp3`;
  image.src = `img/${songs[currentMusic].img}.jpg`;
  artist.textContent = songs[currentMusic].artist;
  changeIcon();
};
const displayTime = function () {
  currentTime.innerHTML = `${parseInt(musicTrack.currentTime / 60)}:${String(
    parseInt(musicTrack.currentTime % 60)
  ).padStart(2, "0")}`;
  TotalTimeLeft.textContent = `${parseInt(
    (musicTrack.duration - musicTrack.currentTime) / 60
  )}:${String(
    parseInt((musicTrack.duration - musicTrack.currentTime) % 60)
  ).padStart(2, "0")}`;
};
const makePlayList = function () {
  songs.map((song) => {
    const container = document.createElement("div");
  });
};
////////////////////////////////////////////////////////
// modes functions
const nightModeAcitvate = function () {
  modeSwitch.style.transform = "translateX(2.4rem)";
  document.body.className = "night";
  currentMode = modeState.night;
};
const dayModeActivate = function () {
  modeSwitch.style.transform = "translateX(0rem)";
  document.body.className = "";
  currentMode = modeState.day;
};

playPause.addEventListener("click", function (e) {
  if (!e.target.classList.contains("fas")) return;
  let icon = e.target.classList[1].split("-");
  if (icon.includes("play")) {
    musicTrack.play();
    e.target.classList.remove("fa-play-circle");
    icon[1] = "pause";
  } else if (icon.includes("pause")) {
    musicTrack.pause();
    e.target.classList.remove("fa-pause-circle");
    icon[1] = "play";
  }
  icon = icon.join("-");
  e.target.classList.add(icon);
});

musicTrack.addEventListener("timeupdate", (e) => {
  progressBar.style.width = `${
    (musicTrack.currentTime / musicTrack.duration) * 100
  }%`;
  displayTime();
});

musicTrack.addEventListener("ended", function (e) {
  const endedMusicName = musicTrack.getAttribute("src").slice(
    0,
    musicTrack
      .getAttribute("src")
      .split("")
      .findIndex((chart) => chart === "-")
  );
  console.log(endedMusicName);
});
musicTrack.addEventListener("loadeddata", function (e) {
  console.log(musicTrack.duration);
  displayTime();
});

preveMusic.addEventListener("click", function (e) {
  currentMusic--;
  changeMusic();
});
nextMusic.addEventListener("click", function (e) {
  currentMusic++;
  changeMusic();
});
progressBarConainer.addEventListener("mousemove", function (e) {
  document.querySelector(".overlay-bar").style.width = `${
    ((e.clientX - progressBarConainer.getBoundingClientRect().left) /
      progressBarConainer.getBoundingClientRect().width) *
    100
  }%`;
});
progressBarConainer.addEventListener("mouseout", function (e) {
  document.querySelector(".overlay-bar").style.width = `0%`;
});
progressBarConainer.addEventListener("click", function (e) {
  const newTime =
    (e.offsetX / progressBarConainer.getBoundingClientRect().width) * 100;

  progressBar.style.width = `${newTime}%`;
  console.log(MusicTimeSeek(newTime));
  musicTrack.currentTime = MusicTimeSeek(newTime);
});

imageContainer.addEventListener("click", function (e) {
  image.style.transform = "rotateY(180deg)";
  playList.style.opacity = "1";
  // imageContainer.style.transform = "scale(1.4)";
  imageContainer.style.width = "60%";
  imageContainer.style.height = "60%";
});

darkMode.addEventListener("click", function (e) {
  currentMode === modeState.day ? nightModeAcitvate() : dayModeActivate();
});

{
  /* <ul class="Tracks-list">
            <li class="Tracks"></li>
          </ul> */
}
