// menu.js
export function setupMenuToggle() {
    const hamButton = document.querySelector('#menu');
    const navigation = document.querySelector('.navigation');
  
    hamButton.addEventListener('click', () => {
      navigation.classList.toggle('open');
      hamButton.classList.toggle('open');
    });
  }