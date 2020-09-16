import './styles/main.scss';
import WaveSurfer from 'wavesurfer.js';

console.log('main loaded');

// audio controls
const audioPlay = document.getElementById('play');
const audioBack = document.getElementById('back');
const audioForward = document.getElementById('forward');
const audioMute = document.getElementById('mute');
const audioVolume = document.getElementById('volume');
const audioTimestamp = document.getElementById('timestamp');
const audioPlayback = document.getElementById('playback');
const audioFileName = document.getElementById('fileName');

//place to hold audio file
let currentFile;

// init audio player via wavesurfer.js
const player = WaveSurfer.create({
  container: '#waveform',
  waveColor: 'blue',
  progressColor: 'purple',
  cursorColor: 'red',
  responsive: true,
  backend: 'MediaElement',
  mediaType: 'audio',
  height: 106,
  barWidth: 2,
  barGap: 2,
  normalize: true,
  barMinHeight: 1,
  barRadius: 2,
  hideScrollbar: true,
  scrollParent: true,
  minPxPerSec: 10,
});

player.setVolume(0.25);

//Attach events
audioFile.addEventListener('change', (e) => {
  currentFile = e.target.files[0];
  player.load(URL.createObjectURL(currentFile));
  audioFileName.textContent = currentFile.name;

});

audioPlay.addEventListener('click', (e) => {
  player.playPause();
});

audioBack.addEventListener('click', (e) => {
  player.skip(-5);
});

audioForward.addEventListener('click', (e) => {
  player.skip(5);
});

audioVolume.addEventListener('input', (e) => {
  player.setVolume(e.target.value);
});

audioMute.addEventListener('click', (e) => {
  player.toggleMute();
});

audioPlayback.addEventListener('input', (e) => {
  player.setPlaybackRate(e.target.value);
});

player.on('mute', (muted) => {
  if (muted) {
    audioMute.classList.add('muted');
  } else {
    audioMute.classList.remove('muted');
  }
});

player.on('pause', (e) => {
  audioPlay.classList.toggle('playing');
});

player.on('play', (e) => {
  audioPlay.classList.toggle('playing');
});

player.on('audioprocess', (seconds) => {
  audioTimestamp.textContent = toTimestamp(seconds);
});

player.on('seek', () => {
  audioTimestamp.textContent = toTimestamp(player.getCurrentTime());
});

//Helpers
function toTimestamp(seconds) {
  return new Date(seconds * 1000).toISOString().substr(11, 8);
}


//File loading
document.getElementById('loadFile').addEventListener('click', (e) => {
  audioFile.click();
})