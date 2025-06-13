import { useState, useRef } from "react"
import image from "./assets/Untitled.jpg"
import music1 from "./assets/Wish You The Best.mp3"
import music2 from "./assets/Before You Go.mp3"
import music3 from "./assets/Koino Uta.mp3"
function App() {
  // States
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [musicList, setMusicList] = useState([
    {
      title: "Wish You The Best",
      song: music1,
      author: "Lewis Capaldi",
      isLoved: false,
      isFav: false,
    },
    {
      title: "Before You Go",
      song: music2,
      author: "Lewis Capaldi",
      isLoved: false,
      isFav: false,
    },
    {
      title: "Koino Uta",
      song: music3,
      author: "Yunomi",
      isLoved: false,
      isFav: false,
    },
  ])
  const [isLoved,setIsLoved] = useState(false)
  const [isFav,setIsFav] = useState(false)
  const [musicIndex, setMusicIndex] = useState(0)

  const audioRef: any = useRef(null)

  const handleClick = () => { 
    setIsPlaying(!isPlaying)
    if(isPlaying) audioRef.current.pause()
    else audioRef.current.play()
  }

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime)
    setDuration(audioRef.current.duration)
    setIsLoved(musicList[musicIndex].isLoved)
    setIsFav(musicList[musicIndex].isFav)
  }

  const handleSeek = (e: any) => {
    audioRef.current.currentTime = e.target.value
    setCurrentTime(e.target.value)
  }

  const formatTime = (durationSeconds: number = 0) => {
    const minutes = Math.floor(durationSeconds / 60)
    const seconds = Math.floor(durationSeconds % 60)
    const formatedSeconds = seconds.toString().padStart(2, "0")
    return `${minutes}:${formatedSeconds}`
  }

  const handleNextClick = () => {
    let i = musicIndex + 1
    const max = musicList.length - 1

    if(i>max) i = 0
    setMusicIndex(i)
    setCurrentTime(audioRef.current.currentTime)
    setIsLoved(musicList[musicIndex].isLoved)
    setIsFav(musicList[musicIndex].isFav)
  }

  const handlePreviousClick = () => {
    let i = musicIndex - 1
    const max = musicList.length - 1

    if(i<0) i = max
    setMusicIndex(i)
    setCurrentTime(audioRef.current.currentTime)
    setIsLoved(musicList[musicIndex].isLoved)
    setIsFav(musicList[musicIndex].isFav)
  }

  const handleLoveClick = () => { 
    const newMusicList = musicList
    newMusicList[musicIndex].isLoved = !(newMusicList[musicIndex].isLoved)
    setMusicList(newMusicList)
  }

  const handleFavClick = () => { 
    const newMusicList = musicList
    newMusicList[musicIndex].isFav = !(newMusicList[musicIndex].isFav)
    setMusicList(newMusicList)
  }

  const handleAudioEnd = () => {
    const max = musicList.length - 1
    let newIndex = musicIndex + 1
    if(newIndex<0) newIndex = max
    if(newIndex>max) newIndex = 0
    setMusicIndex(newIndex)
  }
  return (
    <div className="bg-[#e0e0e0] w-full h-dvh gap-8 grid grid-rows-[100px_300px_1fr]">
      <audio
        src={musicList[musicIndex].song}
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        autoPlay={isPlaying}
        onEnded={handleAudioEnd}
      />
      <div className="mt-40 flex flex-col justify-end items-center">
        <h1>{musicList[musicIndex].author}</h1>
        <h1 className=" block text-4xl text-center text-slate-500/50">{musicList[musicIndex].title}</h1>
      </div>
      <div className="mt-20 row-start-2 grid grid-rows-[min-content,_1fr] gap-9">
        <div className="grid grid-cols-[1fr_200px_1fr] gap-10">
          <div className="self-center justify-self-end">
            <div className="neumorph-box w-15 without-inset">
              <button type="button" onClick={handleLoveClick} className={`i-lucide-heart text-3xl ${isLoved ? "text-red-400" : ""}`} />
            </div>
          </div>
          <div className="place-self-center">
            <div className="neumorph-box w-60">
              <img src={image} alt="album image" className="music-cover" />
            </div>
          </div>
          <div className="self-center justify-self-start">
            <div className="neumorph-box w-15 without-inset">
              <button type="button" onClick={handleFavClick} className={`i-lucide-star text-3xl ${isFav ? "text-yellow-400" : ""}`} />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <h1 className="text-3xl text-slate-500"></h1>
       </div>
      </div>
      <div className="mt-30 row-start-3 grid grid-rows-[min-content_min-content] gap-9">
        <div className="row-start-1 flex flex-col gap-6 justify-center items-center">
          <input type="range" value={currentTime} max={duration} onChange={handleSeek} className="player-range" />
          <div className="flex justify-between w-full px-15">
            <span>{formatTime(currentTime || 0)}</span>
            <span>{formatTime(duration || 0)}</span>
          </div>
        </div>
        <div className="row-start-2 flex justify-center items-center gap-9">
          <div className="neumorph-box w-15 without-inset">
            <button className="i-lucide-arrow-left text-2xl" onClick={handlePreviousClick} type="button"/>
          </div>
          <div className="neumorph-box w-30 without-inset">
            <button onClick={handleClick} className={`${isPlaying ? "i-lucide-pause": "i-lucide-play"} text-6xl`}/>
          </div>
          <div className="neumorph-box w-15 without-inset">
            <button className="i-lucide-arrow-right text-2xl" onClick={handleNextClick} type="button"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
