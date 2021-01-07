const githubService = require('../../../services/github.service')

const mounted = () => window.addEventListener('DOMContentLoaded', () => searchOnMount('ederdeivid'))

const searchOnMount = async (username) => {
  return new Promise(async (resolve, reject) => {
    addLoading()
    try {
      const { data } = await githubService.infoUser(username)

      showUserInfoInTable(data)
      resolve('ok')
    } catch (err) {
      reject(err)
    } finally {
      addLoading()
    }
  })
}

const openGitProfile = () => {
  const btnProfile = document.querySelector('.challenge__profile__name')
  btnProfile.addEventListener('click', () => window.open('https://github.com/ederdeivid', '_blank'))
}

const addLoading = () => {
  const card = document.querySelector('.challenge__card')
  const iElement = document.querySelector('.challenge__i')
  iElement.classList.toggle('icon-loading')
  iElement.classList.toggle('animate-spin')
  card.classList.toggle('on__loading')
}

const showUserInfoInTable = ({ avatar_url, ...rest }) => {
  addAvatarImage(avatar_url)
  addQuantities(rest)
}

const addAvatarImage = (avatar_url) => {
  const avatarElement = document.querySelector('.avatar__img')
  avatarElement.style.backgroundImage = `url(${avatar_url})`
}

const addQuantities = (data) => {
  const elements = ['.followers__qtd', '.following__qtd', '.public_repos__qtd']
  elements.map(element => {
    document.querySelector(element).innerHTML = data[`${element.replace('__qtd', '').replace('.', '')}`]
  })
}

mounted()
openGitProfile()