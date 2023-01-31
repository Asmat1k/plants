const menuBtn = document.querySelector('.header__menu-btn');
const menu = document.querySelector('.header__nav');
menuBtn.addEventListener('click', function(){
    menuBtn.classList.toggle('active');
	menu.classList.toggle('active');
    document.body.classList.toggle('lock');
    const menuLinks = document.querySelectorAll('.link-nav');
        menuLinks.forEach(menuLink => menuLink.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                menu.classList.remove('active');
                document.body.classList.remove('lock');
            }));
})


const buttons = document.querySelectorAll('.section-service__buttons>.service-cards__button');
const cards = document.querySelectorAll('.section-service__card');
const gardens = document.querySelectorAll('.garden');
const plantings = document.querySelectorAll('.planting');
const lawns = document.querySelectorAll('.lawn');
let pushed = 0, isPushed1 = 0, isPushed2 = 0, isPushed3 = 0;
buttons.forEach(button => button.addEventListener('click', () => {
    if(pushed<=0) {
        isPushed1 = isPushed2 = isPushed3 = pushed = 0;
        cards.forEach(card => card.classList.remove('blured'));
    }
    if(pushed==0) cards.forEach(card => card.classList.add('blured'));
    button.classList.toggle('active-button');
    if(button.classList.contains("cards__button-garden")) {
        gardens.forEach(card => card.classList.toggle('blured'));
        if(isPushed1==0) { pushed++; isPushed1 = 1; }
        else { pushed--; isPushed1 = 0; }
    }
    else if(button.classList.contains("cards__button-planting")) {
        plantings.forEach(card => card.classList.toggle('blured'));
        if(isPushed2==0) { pushed++; isPushed2 = 1; }
        else { pushed--; isPushed2 = 0;}
    }  
    else if(button.classList.contains("cards__button-lawn")) {
        lawns.forEach(card => card.classList.toggle('blured'));
        if(isPushed3==0) { pushed++; isPushed3 = 1;}
        else { pushed--; isPushed3 = 0; }
    } 
    if(pushed==3) {
        cards.forEach(card => card.classList.remove('blured'));
        buttons.forEach(button => button.classList.remove('active-button'));
        pushed = 0;
    }    
}));


let coll = document.querySelector('.list-collapsible');
let act = document.querySelector('.list-main');
let img = document.querySelector('.section-contacts-img');
let arrow = document.querySelector('.list-title');
let list = document.querySelectorAll('.list-content>ul>li');
let card = document.querySelector('.section-contacts__card');
let cardCity = document.querySelector('.card-city');
let cardPhone = document.querySelector('.card-phone');
let cardAdress = document.querySelector('.card-adress');
let call = document.querySelector('.card-but');
const city = ['Canandaigua, NY','New York City','Yonkers, NY','Sherrill, NY'];
const phone = ['+1 585 393 0001','+1 212 456 0002','+1 914 678 0003','+1 315 908 0004'];
const adress = ['151 Charlotte Street','9 East 91st Street','511 Warburton Ave','14 WEST Noyes BLVD'];
coll.addEventListener('click', function() {
    act.classList.toggle('active-list');
    let content = document.querySelector('.list-content');
    if(content.style.maxHeight) {
        content.style.maxHeight = null;
        arrow.className = "list-title";
    }
    else {
        coll.style.marginTop = '61px'
        content.style.maxHeight = '234px';
        arrow.className = "active-after";
        img.style.marginTop = '-21px';
        if(window.screen.width<380) coll.style.marginTop = '42px'
        if(window.screen.width<550) img.style.display = 'none';
        else  {
            img.style.display = 'block';
            if(window.screen.width>1220)
                img.style.marginTop = '-60px';
        }
    }
    if(act.classList.contains('active-list'))
        card.style.display = 'none';
    for(let i=0; i<list.length; i++) {
        list[i].addEventListener("click", function() {
            arrow.textContent = list[i].textContent;
            cardCity.textContent = city[i];
            cardPhone.textContent = phone[i];
            cardAdress.textContent = adress[i];
            card.style.display = 'block';
            call.addEventListener('click', function() {
                window.open("tel:"+ phone[i]);
            })
        })
    }
   
})














