import playList from './playList.js';

const progressVolume = document.querySelector('.volume-progressbar');
const progressBar = document.querySelector('.player-progressbar');
const input = document.querySelector('.settings-block__input');
const settings = document.querySelector('.settings');
const warning = document.querySelector('.warning');
const language = document.querySelector('.slider');
const mute = document.querySelector('.volume');
const greeting = document.querySelector('.greeting-container');
const weather = document.querySelector('.weather');
const player = document.querySelector('.player');
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const quotes = document.querySelector('footer');
const audio = new Audio();
const img = new Image();
let randomNum;
let playNum = 0;
let isPlay = false;
let isMuted = false;
const greetingTranslation = {
    'en': ['Good night,','Good morning,','Good afternoon,','Good evening,'],
    'ru': ['Доброй ночи,','Доброе утро,','Добрый день,','Добрый вечер,'],
};
let lang;
let lastQuote;
let source = 'GitHub';

// в лока сторэдж c key
function setLocalStorageStatus(name, status) {
    localStorage.setItem(name, status);
}
window.addEventListener('beforeunload', setLocalStorage);
 
// смена языка
function changeLanguage() {
    language.classList.toggle('active');
    if(language.classList.contains('active')) {
        lang = 'en';
        setLocalStorageStatus('lang','en');
    }
    else {
        lang = 'ru';
        setLocalStorageStatus('lang','ru');
    }
    showTime();
    translateDefCity();
    translateQuote();
    getWeather();
    changeLangSettings()
}
language.addEventListener('click', changeLanguage);

// показ времени
function showTime() {
    const time = document.querySelector('.time');
    const date  = new Date();
    const currentTime = lang == 'en' ? date.toLocaleTimeString('en-US') : date.toLocaleTimeString();
    time.textContent = currentTime;
    if(source == 'GitHub')
        setBg();
    slideImg();
    showDate(lang);
    showGreeting(lang);
    setTimeout(showTime, 1000);
}

// показ даты
function showDate() {
    const element = document.querySelector('.date');
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'};
    const currentDate = lang == 'en' ? date.toLocaleDateString('en-US', options) : date.toLocaleDateString('ru-Ru', options);
    element.textContent = currentDate;
}

// показ приветствия
function showGreeting() {
    const element = document.querySelector('.greeting');
    const name = document.querySelector('.name');
    const date = new Date();
    const hours = date.getHours();
    const timeofDay = getTimeOfDay(hours);
    name.placeholder = lang == 'en' ? '[Enter name]' : '[Введите имя]';
    element.textContent = lang == 'en' ?  greetingTranslation.en[timeofDay] : element.textContent = greetingTranslation.ru[timeofDay];
}

// какое время суток
function getTimeOfDay(hours) {
    hours =  Math.floor(hours/6);
    if(hours < 1)
        return 0
    else if(hours < 2)
        return 1;
    else if(hours < 3)
        return 2;
    else 
        return 3;
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
    if(localStorage.getItem('player')) {
        if(localStorage.getItem('player')=='hide')
            player.classList.add('opacity');
    }
    if(localStorage.getItem('weather')) {
        if(localStorage.getItem('weather')=='hide')
            weather.classList.add('opacity');
    }
    if(localStorage.getItem('time')) {
        if(localStorage.getItem('time')=='hide')
            time.classList.add('opacity');
    }
    if(localStorage.getItem('date')) {
        if(localStorage.getItem('date')=='hide')
            date.classList.add('opacity');
    }
    if(localStorage.getItem('greeting')) {
        if(localStorage.getItem('greeting')=='hide')
            greeting.classList.add('opacity');
    }
    if(localStorage.getItem('quotes')) {
        if(localStorage.getItem('quotes')=='hide') {
            quotes.classList.add('opacity');
        }
    }
    if(localStorage.getItem('lang')) {
        if(localStorage.getItem('lang')=='en') {
            language.classList.add('active');
            lang = localStorage.getItem('lang');
        }
    }
}
window.addEventListener('load', getLocalStorage);

// установка рандомного фона
async function setBg() {
    if(warning.classList.contains('opened')) 
        warning.classList.remove('opened');
    const date = new Date();
    const body = document.querySelector('body');
    const hours = date.getHours();
    let timeOfDay = getTimeOfDay(hours);
    let timeOfDatText = timeOfDay == 0 ? 'night' : timeOfDay == 1 ? 'morning' : timeOfDay == 2 ? 'afternoon' : 'evening';
    let bgNum = randomNum.toString();
    bgNum = bgNum < 10 ? '0' + bgNum.toString() : bgNum.toString();
    img.src = `https://github.com/Asmat1k/stage1-tasks/blob/assets/images/${timeOfDatText}/${bgNum}.jpg?raw=true`;
    img.onload = () => {
        body.style.backgroundImage = `url(${img.src}`;
    }
}

// unsplash api
async function getLinkToImageUnsplash() {
    let timeOfDay, timeOfDayText;
    if(input.value=='') {
        const date = new Date();
        const hours = date.getHours();
        timeOfDay = getTimeOfDay(hours); 
        timeOfDayText = timeOfDay == 0 ? 'night' : timeOfDay == 1 ? 'morning' : timeOfDay == 2 ? 'afternoon' : 'evening';
        input.value = timeOfDayText;
    } 
    const url = `https://api.unsplash.com/photos/random?query=${input.value}&client_id=SdG4HTH1ewsx9-4zD5YvLB8GwQDtyvdC6zTVH5TnsIk`;
    const res = await fetch(url);
    const data = await res.json();
    img.src = data.urls.regular;
    img.onload = () => {
        document.body.style.backgroundImage = `url(${img.src})`;
    }
}

// flicker api
async function getLinkToImageFlikcer() {
    let timeOfDay, timeOfDayText;
    if(input.value=='') {
        const date = new Date();
        const hours = date.getHours(); 
        timeOfDayText = timeOfDay == 0 ? 'night' : timeOfDay == 1 ? 'morning' : timeOfDay == 2 ? 'afternoon' : 'evening';
        input.value = timeOfDayText;
    } 
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=8d3623c6c03db0d807b8a25a073c131a&tags=${input.value}&extras=url_l&format=json&nojsoncallback=1`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        img.src = data.photos.photo[randomNum].url_l;
        if(data.cod != 404) {
            img.onload = () => {
                document.body.style.backgroundImage = `url(${img.src})`;
            }
        }
        warning.classList.remove('opened');
    }
    catch(err) {
        warning.classList.add('opened');
    } 
}

// рандомный номер
function getRandomNum() {
    randomNum = (Math.floor(Math.random() * 20) + 1).toString();
}

// следующее изображение
function getSlideNext() {
    randomNum = randomNum < 20? Number(randomNum)+1 : 1;
    if(source == 'Flickr')
        getLinkToImageFlikcer();
    else if(source == 'Unsplash')
        getLinkToImageUnsplash();
}

// предыдущее изображения
function getSlidePrev() {
    randomNum = randomNum == 1 ? 20 : Number(randomNum)-1;
    if(source == 'Flickr')
        getLinkToImageFlikcer();
    else if(source == 'Unsplash')
        getLinkToImageUnsplash();
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
    const city = document.querySelector('.city');
    function setLocalStorage() {
        localStorage.setItem('city', city.value);
    }
    window.addEventListener('beforeunload', setLocalStorage);
    // загрузка города из лс
    function getLocalStorage() {
        if(localStorage.getItem('city'))
            city.value = localStorage.getItem('city');
        else {
            if(localStorage.getItem('lang')=='en')
                city.value = 'Minsk';
            if(localStorage.getItem('lang')=='ru' || !localStorage.getItem('lang'))
                city.value = 'Минск';
        }      
        getWeather();
    }
    window.addEventListener('load', getLocalStorage);
    const weatherDescription = document.querySelector('.weather-description');
    const weatherIcon = document.querySelector('.weather-icon');
    const temperature = document.querySelector('.temperature');
    const humidity = document.querySelector('.humidity');
    const wind = document.querySelector('.wind');
    let langLoc;
    if(!localStorage.getItem('lang'))
        langLoc = 'ru';
    else
        langLoc = localStorage.getItem('lang');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${langLoc}&appid=551cb3c09778bc804cc88404eee46c7e&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if(data.cod != 404) {
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.floor(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        if(localStorage.getItem('lang')==='ru' || !localStorage.getItem('lang')) {
            wind.textContent = `Скорость ветра: ${Math.floor(data.wind.speed)} м/с`;
            humidity.textContent = `Влажность: ${data.main.humidity}%`;
        }
        else if (localStorage.getItem('lang')==='en') {
            wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} м/с`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
        }
    }
    else {
        weatherDescription.textContent = ``;
        humidity.textContent = ``;
        if(localStorage.getItem('lang')==='ru' || !localStorage.getItem('lang')) {
            temperature.textContent = `Город введен неверно`;
            wind.textContent = `Попробуйте ещё раз`;
        }
        else if(localStorage.getItem('lang')==='en') {
            temperature.textContent = `Wrong city`;
            wind.textContent = `Try again`;
        }
        
    }
    city.addEventListener('change', getWeather);
}

// перевод города по умолчанию
function translateDefCity() {
    const city = document.querySelector('.city');
    if(city.value === 'Minsk' || city.value === 'Минск') {
        if(localStorage.getItem('lang')=='en')
                    city.value = 'Minsk';
        else if(localStorage.getItem('lang')=='ru')
                    city.value = 'Минск';
    }
}

// цитаты
async function getQuotes() {
    const refresh = document.querySelector('.change-quote');
    const author = document.querySelector('.author');
    const quote = document.querySelector('.quote');
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    const rand = (Math.floor(Math.random() * 19) + 0);
    if(localStorage.getItem('lang')==='ru'|| !localStorage.getItem('lang')) {
        lastQuote = rand;
        quote.textContent = data[rand].textRu;
        author.textContent = data[rand].authorRu;
    }
    else if(localStorage.getItem('lang')==='en') {
        lastQuote = rand;
        quote.textContent = data[rand].textEn;
        author.textContent = data[rand].authorEn;
    }
    refresh.addEventListener('click', getQuotes);
}

// перевод цитаты
async function translateQuote() {
    const author = document.querySelector('.author');
    const quote = document.querySelector('.quote');
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    if(localStorage.getItem('lang')==='ru') {
        quote.textContent = data[lastQuote].textRu;
        author.textContent = data[lastQuote].authorRu;
    }
    else if(localStorage.getItem('lang')==='en') {
        quote.textContent = data[lastQuote].textEn;
        author.textContent = data[lastQuote].authorEn;
    }
} 

// играть следующую песню
function playNext() {
    playNum = playNum < 3 ? playNum+1 : 0;
    isPlay = true;
    playAudio();
}

// играть предыдущую песню
function playPrev() {
    playNum = playNum >= 1 ? playNum-1 : 3;
    isPlay = true;
    playAudio();
}

// смена песни
function changeSong() {
    const playNext_ = document.querySelector('.play-next');
    const playPrev_ = document.querySelector('.play-prev');
    playNext_.addEventListener('click', playNext);
    playPrev_.addEventListener('click', playPrev);
}

//если песня закончена, то играть следующую
audio.addEventListener('ended', playNext);

// создание плейлиста по файлу
function addPlayList() {
    const playListContainer = document.querySelector('.play-list');
    for(let i = 0; i < playList.length; i++) {
        const li = document.createElement('li');
        const img = document.createElement('button');
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        img.classList.add('playLi')
        img.classList.add('player-icon');
        li.classList.add('play-item');
        li.textContent = playList[i].title;
        wrapper.append(img);
        wrapper.append(li);
        playListContainer.append(wrapper);
    }
}

// клик на список
function activeList() {
    const buttons = document.querySelectorAll('.wrapper > button');
    const li = document.querySelectorAll('.play-item');
    const playButton = document.querySelector('.play');
    const butLength = buttons.length;
    for(let i=0; i<butLength; i++) {
        buttons[i].addEventListener('click', function() {
            if(buttons[i].classList.contains('pause')) {
                isPlay = false;
                playButton.classList.remove('pause');
                li[i].classList.remove('playing');
                buttons[i].classList.remove('pause');
                audio.pause();
            }
            else {
                isPlay = true;
                unActiveList();
                playButton.classList.add('pause');
                li[i].classList.add('playing');
                buttons[i].classList.add('pause');
                playNum = i;
                audio.src = playList[playNum].src;
                audio.currentTime = 0;
                audio.play();
            }
        });
    }
}
 
// играть и паузить аудио
function playAudio() {
    const currentMusic = document.querySelector('.current-music')
    const playButton = document.querySelector('.play');
    const buttons = document.querySelectorAll('.wrapper > button');
    const li = document.querySelectorAll('.play-item');
    currentMusic.textContent = playList[playNum].title;
    audio.src = playList[playNum].src;
    // листание кнопками
    if(isPlay) {
        audio.currentTime = 0;
        audio.play();
        unActiveList();
        //li[playNum].classList.toggle('chosen');
        li[playNum].classList.add('playing');
        playButton.classList.add('pause');
        buttons[playNum].classList.add('pause');
    }
    else if(!isPlay) {
        // клик по главной кнопке
        playButton.addEventListener('click', function() {
            if(!isPlay) {
                isPlay = true;
                audio.currentTime = 0;
                audio.play();
                li[playNum].classList.add('playing');
                buttons[playNum].classList.add('pause');
                playButton.classList.add('pause');
            }
            else if(isPlay) {
                isPlay = false;
                audio.pause();
                li[playNum].classList.remove('playing');
                buttons[playNum].classList.remove('pause');
                playButton.classList.remove('pause');
            }
        });
    } 
}

// деактивировать список
function unActiveList() {
    const buttons = document.querySelectorAll('.wrapper > button');
    const li = document.querySelectorAll('.play-item');
    const butLength = buttons.length;
    for(let j=0; j<butLength; j++) {
        buttons[j].classList.remove('pause');
        li[j].classList.remove('playing');
    }
}

// прогрессБар двжиение + время
function updateProgress(event) {
    const progress = document.querySelector('.progress');
    const curT = document.querySelector('.currentTime');
    const dur = document.querySelector('.duration');
    const {duration, currentTime} = event.srcElement;
    curT.textContent = outTime(currentTime);
    dur.textContent = outTime(duration);
    if (dur.innerHTML === "NaN:NaN") {
        dur.innerHTML = '00:00'
    }
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`
}
audio.addEventListener('timeupdate', updateProgress);

// конвретер в нормальный вид времени
function outTime(time) {
    let min = Math.floor(time/60) < 10 ? '0' + Math.floor(time/60) : Math.floor(time/60);
    let sec = Math.floor(time) < 10 ? '0' + Math.floor(time) : Math.floor(time);
    if(sec > 59) {
        sec = Math.floor(time)-60;
    }
    return  `${min}:${sec}`;
}

// перемотка прогрессБаром
function setProgress(event) {
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}
progressBar.addEventListener('click', setProgress);

// регулировка звука прогрессбаром
function setVolume(event) {
    const progressActive = document.querySelector('.volume-progress')
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const volumePercent = (clickX / width) * 100;
    audio.volume = (clickX / width);
    progressActive.style.width = `${volumePercent}%`;
    isMuted = false;
}
progressVolume.addEventListener('click', setVolume);

// мут/анмут музыки
function muteMusic() {
    mute.classList.toggle('volumeOff');
    if(!isMuted) {
        audio.muted = true;
        isMuted = true;
    }
    else {
        audio.muted = false;
        isMuted = false;
    }
}
mute.addEventListener('click', muteMusic);

// открытие настроек 
function openSettings() {
    const settingsBlock = document.querySelector('.settings-block');
    const inp = document.querySelectorAll('.hide-switch > .switch > input');
    const inpLang = document.querySelectorAll('.language > .switch > input');
    const info = document.querySelector('.settings-block-info');    
    const masNames = ['lang','player', 'weather', 'time', 'date', 'greeting', 'quotes'];
    const length = masNames.length;
    for(let i=0; i<length; i++) {
        if(localStorage.getItem(masNames[i])) {
            if(localStorage.getItem(masNames[i]) == 'hide') {
                inp[i-1].checked = true;
            }
            else if(localStorage.getItem(masNames[i]) == 'show'){
                inp[i-1].checked = false;
            }
            
            if(localStorage.getItem(masNames[i]) == 'en') {
                inpLang[i].checked = true;
                changeLangSettings();
            }
            else if(localStorage.getItem(masNames[i]) == 'ru') {
                inpLang[i].checked = false;
                changeLangSettings();
            }
            
        }
    }
    info.classList.toggle('opened');
    settingsBlock.classList.toggle('settings-block-open');
    settingsBlock.classList.toggle('opened');
}
settings.addEventListener('click', openSettings);

// смена языка в настройках
function changeLangSettings() {
    const blockEngNames = ['Player','Weather','Time','Date','Greeting','Quotes'];
    const blockRuNames = ['Плеер', 'Погода', 'Время', 'Дата', 'Имя', 'Цитаты']
    const titleEng = ['Lang', 'Hide/Show', 'Change source'];
    const titleRu = ['Язык', 'Видимость', 'Смена фона'];
    const errorRu = 'Невозможно найти данный запрос';
    const errorEng = 'Cant find your request';
    const helpRu = 'нажмите Enter для обновления';
    const helpEng = 'press Enter to update'
    const blockNames = document.querySelectorAll('.settings-block__title');
    const title = document.querySelectorAll('.title');
    const help = document.querySelector('.help');
    const titleLength = titleRu.length;
    const length = blockNames.length;
    if(lang=='en') {
        for(let i=0, j=0; i<length; i++, j++) {
            if(j<titleLength) 
                title[j].textContent = titleEng[j];
            if(length-i==1) {
                warning.textContent = errorEng;
                help.textContent = helpEng;
            }    
            blockNames[i].textContent = blockEngNames[i];
        }
    }
    if(lang=='ru') {
        for(let i=0, j=0; i<length; i++,j++) {
            if(j<titleLength) 
                title[j].textContent = titleRu[j];
            if(length-i==1) {
                warning.textContent = errorRu; 
                help.textContent = helpRu;
            }
            blockNames[i].textContent = blockRuNames[i];
        }
    }
}

// закрыть настройки
function closeSettings() {
    const close = document.querySelector('.settings-block__close');
    const settings = document.querySelector('.settings-block');
    close.addEventListener('click', function() {
        settings.classList.remove('settings-block-open');
    })
}

// прятать блоки
function hideBlock() {
    const mas = [player, weather, time, date, greeting, quotes];
    const masName = ['player', 'weather', 'time', 'date', 'greeting', 'quotes'];
    const switchButton = document.querySelectorAll('.hide-switch > .switch > .round');
    const length = switchButton.length;
    for(let i=0; i<length; i++) {
        switchButton[i].addEventListener('click', function() {
            if(mas[i].classList.contains('opacity')) {
                setLocalStorageStatus(masName[i], 'show');
                mas[i].classList.remove('opacity');
            }
            else {
                setLocalStorageStatus(masName[i], 'hide');
                mas[i].classList.add('opacity');
            }
        });
    }
}

// смена фона
function changeBgSource() {
    const buttons = document.querySelectorAll('.chage-api__button');
    const help = document.querySelector('.help');
    const length = buttons.length;
    buttons.forEach((button) => {
        button.addEventListener('click', function() {
            for(let i=0; i<length; i++) {
                buttons[i].classList.remove('active-button');
            }
            button.classList.add('active-button');
            source = button.textContent;
            if(button.classList.contains('api') && button.classList.contains('active-button')) {
                input.classList.add('active-input');
                help.classList.add('opened');
            }
            else {
                input.classList.remove('active-input');
                help.classList.remove('opened');
            }
            if(button.textContent == 'Flickr')
                getLinkToImageFlikcer();
            else if(button.textContent == 'Unsplash')
                getLinkToImageUnsplash();
        })
    })
}

// подтверждение ввода
function updateBgInput(event) {
    const flickr = document.querySelector('.flickr');
    const unsplash = document.querySelector('.unsplash');
    if(event.code === 'Enter') {
        if(flickr.classList.contains('active-button'))
                getLinkToImageFlikcer();
        else if(unsplash.classList.contains('active-button'))
                getLinkToImageUnsplash();
    }
}
input.addEventListener('keypress', updateBgInput);

closeSettings();
changeBgSource();
hideBlock();
getRandomNum();
addPlayList();
changeSong();
activeList();
playAudio();
getQuotes();
getWeather();
showTime();