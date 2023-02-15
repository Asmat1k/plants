// показ времени
function showTime() {
    const time = document.querySelector('.time');
    const date  = new Date();
    const currentTime =  date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    showGreeting();
    // fix
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
    element.textContent = timeofDay == 'night' ? 'Доброй ночи,' : timeofDay == 'morning' ? 'Доброе утро' : timeofDay == 'day' ? 'Добрый день,' : 'Добрый вечер,';
}

// какое время суток
function getTimeOfDay(hours) {
    hours =  Math.floor(hours/6);
    if(hours <= 1)
        return 'night'
    else if(hours < 2)
        return 'morning';
    else if(hours < 3)
        return 'day';
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

function setBg() {
    const body = document.querySelector('body');
    const date = new Date();
    const hours = date.getHours();
    let timeOfDay = getTimeOfDay(hours);
    let bgNum = randomNum.toString();
    bgNum = bgNum.length < 10 ? bgNum.padStart(1) : bgNum.padStart(0);
    console.log(bgNum);
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
}

function getRandomNum() {
    randomNum = (Math.floor(Math.random() * 20) + 1).toString();
}

function getSlideNext() {
    randomNum = randomNum < 20? Number(randomNum)+1 : 1;
}

function getSlidePrev() {
    randomNum = randomNum == 1 ? 20 : Number(randomNum)-1;
}

function slideImg() {
    const slideNext = document.querySelector('.slide-next');
    const slidePrev = document.querySelector('.slide-prev');
    slideNext.addEventListener('click', getSlideNext);
    slidePrev.addEventListener('click', getSlidePrev);
}

showTime();