const toggleMenu = document.querySelector('.toggle-menu');
const menuPopup = document.querySelector('.menu__popup');
const headerElement = document.querySelector('#header');

toggleMenu.addEventListener('click', () => {
  document.querySelector('.menu__popup').classList.toggle('show-menu');
})

document.onclick = function (e) {
  if (!toggleMenu.contains(e.target) && !menuPopup.contains(e.target)) {
    document.querySelector('.menu__popup').classList.remove('show-menu');
  } 
};


window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    headerElement.classList.add('fixed-header');
  } else {
    headerElement.classList.remove('fixed-header');
  }
});
