// Elements
const player = document.querySelector('.player')
const video = player.querySelector('video')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')

// Functions
function togglePlay() { 
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip() {
  const time = parseFloat(this.dataset.skip);
  video.currentTime += time;
}

let updateSlide = false;
function updateRange() {
  if (updateSlide) {
    video[this.name] = this.value;
  }
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

let startScrub = false;
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

skipButtons.forEach(button => button.addEventListener('click', skip))

ranges.forEach(range => range.addEventListener('mousedown', () => { updateSlide = true }));
ranges.forEach(range => range.addEventListener('mouseup', () => { updateSlide = false }));
ranges.forEach(range => range.addEventListener('change', updateRange));
ranges.forEach(range => range.addEventListener('mousemove', updateRange));

video.addEventListener('canplay', handleProgress);
video.addEventListener('timeupdate', handleProgress);

progress.addEventListener('mousedown', () => { startScrub = true });
progress.addEventListener('mouseup', () => { startScrub = false });
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => { startScrub && scrub(e) });