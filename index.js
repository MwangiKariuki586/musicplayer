let currentSong = 0
const volume = document.querySelector(".volume")
const vol = document.querySelector(".vol")
const volslider = document.querySelector(".volslider")
const container = document.querySelector(".container")
const boom = document.querySelector(".boom")
const play = document.querySelector(".play")
const pause = document.querySelector(".pause")
const currentcover = document.querySelector(".currentCover")
const song =document.querySelector(".song")
const artiste = document.querySelector(".artiste")
const progressbar = document.querySelector(".progressBar")
const range = document.querySelector(".range")
const currenttime = document.querySelector(".currentTime")
const stoptime = document.querySelector(".stopTime")
const prev = document.querySelector(".prev")
const next = document.querySelector(".next")
const forward = document.querySelector(".forward")
const backward = document.querySelector(".backward")
const animatePlay = () => {
    pause.style.display = "block"
    play.style.display = "none"
    currentcover.classList.toggle('play-on')
    boom.play()
}
const animatePause = () => {
        play.style.display = "block"
        pause.style.display = "none"
        currentcover.classList.remove('play-on')
        boom.pause()   
}
play.addEventListener("click",animatePlay)
pause.addEventListener("click",animatePause)
const setSong = (i) => {
    range.value = 0
    let music = songs[i]
    currentSong = i
    boom.src = music.path

    song.innerHTML = music.name
    artiste.innerHTML = music.artist
    currentcover.style.backgroundImage = `url('${music.cover}')`
    setInterval(
        () => {
            range.value = boom.currentTime
            currenttime.innerHTML = timeFormat(boom.currentTime)
            
        }, 500
    )
    range.max = boom.duration
    setInterval(() => {
        stoptime.innerHTML = timeFormat((boom.duration) - (boom.currentTime))
    },500)
    
   
}
range.addEventListener("change",() => {
    boom.currentTime = range.value
})
const timeFormat = (time) => {
    let min = Math.floor(time/60)
    if(min < 10){
        min = `0${min}`
    }
    let sec = Math.floor(time % 60)
    if(sec < 10){
        sec = `0${sec}`
    }
     return min +':'+ sec
    
}


setSong(0)
prev.addEventListener("click",() => {
        if(currentSong <= 0){
        currentSong = songs.length -1
        }else{
            currentSong --
        }
        setSong(currentSong)
        play.click()
    
    
})
next.addEventListener("click",() => {
    if(currentSong >= songs.length -1){
        currentSong = 0
    }else{
        currentSong ++
    }
    setSong(currentSong)
    play.click()

})
backward.addEventListener("click",() => {
    boom.currentTime -= 10
    play.click()
})
forward.addEventListener("click",() => {
    boom.currentTime += 10
    play.click()
})
boom.addEventListener("ended",() => {
     next.click()
     currentcover.classList.add('play-on')
})
// stoptime.onclick = setTimeout(
//         () => {
//             stoptime.innerHTML = timeFormat(boom.duration)
//         }, 300);
// vol.onclick = () => {
//       volslider.style.display = "block"
// }
volslider.addEventListener("change",() => {
    boom.volume = volslider.value/100
})
volume.addEventListener("pointerenter",() => {
    volslider.style.display = "block"
})
volume.addEventListener("pointerleave",() => {
    volslider.style.display = "none"
})
