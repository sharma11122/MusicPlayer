const music =document.querySelector('audio');
const img=document.querySelector('img');
const play=document.getElementById("play");
const title=document.querySelector('#title');
const artist=document.querySelector('#artist');
const prev=document.querySelector('#prev');
const next=document.querySelector('#next');

let progress=document.getElementById("progress");
const total_duration=document.getElementById("duration");
let current_time=document.getElementById("current_time");
const progress_div=document.getElementById("progress_div");

const songs=[
    {
        name:"jubin",
        title:"Lut gaye",
        artist:"jubin"
    },
    {
        name:"pyar hua",
        title:"Thoda Thoda Pyar Hua",
        artist:"Stebin"
    }
];

isPlaying=false;

playMusic=()=>{
    isPlaying=true;
    music.play();
    play.classList.replace('fa-play','fa-pause');
    img.classList.add("anime");
};
pauseMusic=()=>{
    isPlaying=false;
    music.pause();
    play.classList.replace('fa-pause','fa-play');
    img.classList.add("anime");
};

play.addEventListener('click',()=>{
    if(isPlaying){
        pauseMusic();
    }
    else{
        playMusic();
    } 
});
const loadSong=(songs)=>{
    title.textContent=songs.title;
    artist.textContent=songs.artist;
    music.src="music/" + songs.name +".mp3";
    // img.src=`Img/${songs.name}.jpg`;
    img.src="Img/"+ songs.name + ".jpg";

};

// loadSong(songs[0]);
songIndex=0;
const nextSong=()=>{
     songIndex=(songIndex+1)%songs.length;
     loadSong(songs[songIndex]);
     playMusic();
};
const prevSong=()=>{
    songIndex=(songIndex-1 + songs.length)%songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

//progressbar work

music.addEventListener('timeupdate',(event)=>{
    const {currentTime,duration}=event.srcElement;
    console.log(currentTime);
    console.log(duration);

    let progress_time=(currentTime/duration)*100;
    console.log(progress_time);
    progress.style.width=`${progress_time}%`;
    
    //current duration time update
    let min_currentTime=Math.floor(currentTime/60);
    let sec_currentTime=Math.floor(currentTime%60);

    // if(currentTime){


    // }
    if(sec_currentTime<10){
        sec_currentTime=`0${sec_currentTime}`;
    }
    let tot_currentTime=`${min_currentTime}:${sec_currentTime}`;
    current_time.textContent=`${tot_currentTime}`;
   


    //music duration update
    console.log(duration);
    let min_duration=Math.floor(duration/60);
    let sec_duration=Math.floor(duration%60);

    let tot_duration=`${min_duration}:${sec_duration}`;
    if(duration){
    total_duration.textContent=`${tot_duration}`;
    }


    
});

  progress_div.addEventListener('click',(event)=>{
      
    const {duration}=music;
    let move_progress=(event.offsetX/event.srcElement.clientWidth)*duration;
    console.log(move_progress);

    music.currentTime=move_progress;
  })



    //if music end then to play next song
music.addEventListener("ended",nextSong);

next.addEventListener("click",nextSong);
prev.addEventListener('click',prevSong);

