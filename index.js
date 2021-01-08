const navOptions = document.querySelector('.nav__options')
const elements = ['.nav__mobile__button', '.nav__options']

const mobileOptions = () => elements.map(element => toggle(element, 'toggle'))

const toggle = (element, action) => {
  const el = document.querySelector(element)
  el.addEventListener('click', () => navOptions.classList[action]('showing__mobile'))
}

mobileOptions()