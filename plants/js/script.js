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





