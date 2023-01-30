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









