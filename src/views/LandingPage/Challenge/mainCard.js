const { infoUser } = require('../../../services/github.service')
const { username} = require('../../../../config')
const { addLoading } = require('./repos')

const mounted = () => window.addEventListener('DOMContentLoaded', () => searchOnMount(username))

const searchOnMount = async (username) => {
  return new Promise(async (resolve, reject) => {
    addLoading()
    try {
      const { data } = await infoUser(username)
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
  btnProfile.addEventListener('click', () => window.open(`https://github.com/${username}`, '_blank'))
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