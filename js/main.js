const song = document.getElementById('song')
const playBtn = document.querySelector('.play-inner')
const nextBtn = document.querySelector('.play-forward')
const backBtn = document.querySelector('.play-back')
const durationTime = document.querySelector('.duration')
const remainingTime = document.querySelector('.remaining')
const rangeBar = document.querySelector('.range')
const musicName = document.querySelector('.music-name')
const musicImage = document.querySelector('.music-thumb img')
const musicThumbnail = document.querySelector('.music-thumb')
const playRepeat = document.querySelector('.play-repeat')
let isPlaying = true
let indexSong = 0
let isRepeat = false
// const musics = ['Mat-moc.mp3', 'Tong-phu-keyo.mp3', 'co-chac-anh-da-yeu.mp3']
const musics = [
  {
    id: 1,
    title: 'Ta là của nhau',
    file: 'ta-la-cua-nhau.mp3',
    image: 'https://i.ytimg.com/vi/LG5hQJsO8k0/mqdefault.jpg'
  },
  {
    id: 2,
    title: 'Tòng Phu',
    file: 'Tong-phu-keyo.mp3',
    image: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/d/f/9/b/df9b187a2b0e565ebe5b6bd60bdef622.jpg'
  },
  {
    id: 3,
    title: 'Có chắc anh đã yêu',
    file: 'co-chac-anh-da-yeu.mp3',
    image: 'https://images.unsplash.com/photo-1590212151175-e58edd96185b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'
  },
  {
    id: 4,
    title: 'Mặt mộc',
    file: 'Mat-moc.mp3',
    image: 'https://znews-photo.zingcdn.me/w660/Uploaded/wyhktpu/2022_08_17/2_2_.jpg'
  },
]
displayTimer()
let timer 
playRepeat.addEventListener('click', function() {
  if (isRepeat) {
    isRepeat = false
    playRepeat.removeAttribute('style')
  } else {
    isRepeat = true
    playRepeat.style.color = '#ff6bcb'
  }
})

nextBtn.addEventListener('click', () => {
  changeSong(1)
})

backBtn.addEventListener('click', () => {
  changeSong(-1)
})

song.addEventListener('ended', handleEndedSong)
function handleEndedSong() {
  if (isRepeat) {
    isPlaying = true
    playPause()
  } else {
    changeSong(1)
  }
}

function changeSong(dir) {
  if (dir === 1) {
    indexSong++
    if (indexSong >= musics.length) {
      indexSong = 0
    }
    isPlaying = true
  } else if (dir === -1) {
    indexSong--
    if (indexSong < 0) {
      indexSong = musics.length -1
    }
    isPlaying = true
  }
  init(indexSong)
  song.setAttribute('src', `./music/${musics[indexSong].file}`)
  playPause()
}

playBtn.addEventListener('click', playPause)
function playPause() {
  if (isPlaying) {
    musicThumbnail.classList.add('is-playing')
    song.play()
    playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`
    isPlaying = false
    timer = setInterval(displayTimer, 500)

  } else {
    musicThumbnail.classList.remove('is-playing')
    song.pause()
    playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`
    isPlaying = true
    clearInterval(timer)
  }
}

function displayTimer() {
  const { duration, currentTime } = song
  rangeBar.max = duration
  rangeBar.value = currentTime
  remainingTime.textContent = formatTimer(currentTime)
  if (!duration) {
    durationTime.textContent = "00:00"
  } else {
    durationTime.textContent = formatTimer(duration)
  }
}

function formatTimer(number) {
  const minutes = Math.floor(number / 60);
  const seconds = Math.floor(number - minutes * 60);
  return `${minutes < 10 ? '0' + minutes: minutes}:${seconds < 10 ? '0' + seconds:seconds}`
}

rangeBar.addEventListener('change', handleChangeBar)
function handleChangeBar() {
  song.currentTime = rangeBar.value
}

function init(indexSong) {
  song.setAttribute('src', `./music/${musics[indexSong].file}`)
  musicImage.setAttribute('src', musics[indexSong].image)
  musicName.textContent = musics[indexSong].title
} 
displayTimer()
init(indexSong)