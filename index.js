const mobileOptions = () => {
  const mobileButton = document.querySelector('.nav__mobile__button')
  const navOptions = document.querySelector('.nav__options')

  mobileButton.addEventListener('click', () => {
    navOptions.classList.toggle('showing__mobile')
  })
}

mobileOptions()