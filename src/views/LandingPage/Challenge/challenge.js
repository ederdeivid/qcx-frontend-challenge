const githubService = require('../../../services/github.service')

const searchOnMount = async () => {
  return new Promise(async (resolve, reject) => {
    addLoading()
    try {
      window.addEventListener('DOMContentLoaded', async () => {
        const userInfo = await requestProfileInfo('ederdeivid')
        showUserInfoInTable(userInfo)
      })
      resolve()
    } catch (err) {
      reject(err)
    } finally {
      addLoading()
    }
  })
}

const requestProfileInfo = async (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await githubService.infoUser(username)
      resolve(data)
    } catch (err) {
      console.error(err)
      reject(err)
    }
  })
}

const addLoading = () => {
  const card = document.querySelector('.challenge__card')
  card.classList.toggle('card__loading')
}

const showUserInfoInTable = ({ avatar_url, followers, following, public_repos }) => {
  const avatarElement = document.querySelector('.avatar__img')
  avatarElement.style.backgroundImage = `url(${avatar_url})`
}

searchOnMount()