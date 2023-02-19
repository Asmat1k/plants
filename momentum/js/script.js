import playList from './playList.js';
// показ времени
function showTime() {
    const time = document.querySelector('.time');
    const date  = new Date();
    const currentTime =  date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    showGreeting();
    slideImg();
    setBg();
    setTimeout(showTime, 1000);
}

// пока даты
function showDate() {
    const element = document.querySelector('.date');
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'};
    const currentDate = date.toLocaleDateString('ru-Ru', options);
    element.textContent = currentDate;
}

// пока приветствия
function showGreeting() {
    let element = document.querySelector('.greeting');
    const date = new Date();
    const hours = date.getHours();
    const timeofDay = getTimeOfDay(hours);
    element.textContent = timeofDay == 'night' ? 'Доброй ночи,' : timeofDay == 'morning' ? 'Доброе утро' : timeofDay == 'afternoon' ? 'Добрый день,' : 'Добрый вечер,';
}

// какое время суток
function getTimeOfDay(hours) {
    hours =  Math.floor(hours/6);
    if(hours < 1)
        return 'night'
    else if(hours < 2)
        return 'morning';
    else if(hours < 3)
        return 'afternoon';
    else 
        return 'evening';
}

// в лока сторэдж
function setLocalStorage() {
    let name = document.querySelector('.name');
    localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage);

// из локал сторэдж
function getLocalStorage() {
    let name = document.querySelector('.name');
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage);

let randomNum;
getRandomNum();

// установка рандомного фона
function setBg() {
    const body = document.querySelector('body');
    const date = new Date();
    const hours = date.getHours();
    let timeOfDay = getTimeOfDay(hours);
    let bgNum = randomNum.toString();
    bgNum = bgNum < 10 ? '0' + bgNum.toString() : bgNum.toString();
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
        body.style.backgroundImage = `url(${img.src}`;
    }
}

// рандомный номер
function getRandomNum() {
    randomNum = (Math.floor(Math.random() * 20) + 1).toString();
}

function getSlideNext() {
    randomNum = randomNum < 20? Number(randomNum)+1 : 1;
}

function getSlidePrev() {
    randomNum = randomNum == 1 ? 20 : Number(randomNum)-1;
}

// слайдер
function slideImg() {
    const slideNext = document.querySelector('.slide-next');
    const slidePrev = document.querySelector('.slide-prev');
    slideNext.addEventListener('click', getSlideNext);
    slidePrev.addEventListener('click', getSlidePrev);
}


// получение погды
async function getWeather() {
    // загрузка города из лс
    const city = document.querySelector('.city');
    function setLocalStorage() {
        localStorage.setItem('city', city.value);
    }
    window.addEventListener('beforeunload', setLocalStorage);
    function getLocalStorage() {
        if(localStorage.getItem('city'))
            city.value = localStorage.getItem('city');
        else 
            city.value = 'Минск';
        getWeather();
    }
    window.addEventListener('load', getLocalStorage);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=551cb3c09778bc804cc88404eee46c7e&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    const weatherIcon = document.querySelector('.weather-icon');
    const temperature = document.querySelector('.temperature');
    const weatherDescription = document.querySelector('.weather-description');
    const wind = document.querySelector('.wind');
    const humidity = document.querySelector('.humidity');
    if(data.cod != 404) {
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.floor(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Скорость ветра: ${Math.floor(data.wind.speed)} м/с`;
        humidity.textContent = `Влажность: ${data.main.humidity}%`;
    }
    else {
        temperature.textContent = `Город введен неверно`;
        weatherDescription.textContent = ``;
        wind.textContent = `Попробуйте ещё раз`;
        humidity.textContent = ``;
    }
    city.addEventListener('change', getWeather);
}

// цитаты
async function getQuotes() {
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    const quote = document.querySelector('.quote');
    const author = document.querySelector('.author');
    const refresh = document.querySelector('.change-quote');
    const rand = (Math.floor(Math.random() * 20) + 1);
    quote.textContent = data[rand].text;
    author.textContent = data[rand].author;
    refresh.addEventListener('click', getQuotes);
}

const audio = new Audio();
let playNum = 0;
let isPlay = false;

// контроль над песней
function playNext() {
    playNum = playNum < 3 ? playNum+1 : 0;
    isPlay = true;
    playAudio();
}

function playPrev() {
    playNum = playNum >= 1 ? playNum-1 : 3;
    isPlay = true;
    playAudio();
}

function changeSong() {
    const playNext_ = document.querySelector('.play-next');
    const playPrev_ = document.querySelector('.play-prev');
    playNext_.addEventListener('click', playNext);
    playPrev_.addEventListener('click', playPrev);
}

// создание юзер френдли плейлиста
function addPlayList() {
    const playListContainer = document.querySelector('.play-list');
    for(let i = 0; i < playList.length; i++) {
        const li = document.createElement('li');
        li.classList.add('play-item');
        li.textContent = playList[i].title;
        playListContainer.append(li);
    }
}

// играть и паузить аудио
function playAudio() {
    const currentMusic = document.querySelector('.current-music')
    const playButton = document.querySelector('.play');
    const li = document.querySelectorAll('ul>li');
    currentMusic.textContent = playList[playNum].title;
    audio.src = playList[playNum].src;
    for(let i=0; i<li.length; i++) {
        if(li[i].classList.contains('item-active'))
            li[i].classList.remove('item-active');
    }
    if(isPlay) {
        isPlay = true;
        playButton.classList.add('pause');
        audio.currentTime = 0;
        audio.play();
        li[playNum].classList.add('item-active');
    }
    else {
        playButton.addEventListener('click', function() {
            if(!isPlay) {
                isPlay = true;
                playButton.classList.add('pause');
                audio.currentTime = 0;
                audio.play();
                li[playNum].classList.add('item-active');
            }
            else if(isPlay) {
                isPlay = false;
                playButton.classList.remove('pause');
                audio.pause();
            }
        });
    }
}

// прогрессБар двжиение
function updateProgress(event) {
    const progress = document.querySelector('.progress');
    const curT = document.querySelector('.currentTime');
    const dur = document.querySelector('.duration');
    const {duration, currentTime} = event.srcElement;
    curT.textContent = outTime(currentTime);
    dur.textContent = outTime(duration);
    if (dur.innerHTML === "NaN:NaN") {
        dur.innerHTML = 'wait'
    }
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`
}
audio.addEventListener('timeupdate', updateProgress);

// вывод времени
function outTime(time) {
    let min = Math.floor(time/60) < 10 ? '0' + Math.floor(time/60) : Math.floor(time/60);
    let sec = Math.floor(time) < 10 ? '0' + Math.floor(time) : Math.floor(time);
    if(sec > 59) {
        sec = Math.floor(time)-60;
    }
    return  `${min}:${sec}`;
}

const progressBar = document.querySelector('.player-progressbar');
// перемотка прогрессБаром
function setProgress(event) {
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}
progressBar.addEventListener('click', setProgress);

// мут музыки
const mute = document.querySelector('.mute');
let isMuted = false;
function muteMusic() {
    console.log(isMuted);
    if(!isMuted) {
        audio.volume = 0.0001;
        isMuted = true;
    }
    else {
        audio.volume = 1;
        isMuted = false;
    }
}
mute.addEventListener('click', muteMusic);

audio.addEventListener('ended', playNext);

addPlayList();
changeSong();
playAudio();
getQuotes();
getWeather();
showTime();