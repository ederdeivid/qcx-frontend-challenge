const axios = require('axios')

const API = 'https://api.github.com/users'

/**
 * Search user data
 * @param { string } username
 */
const infoUser = async (username) => axios.get(`${API}/${username}`)

/**
 * Search starred repos of an user
 * @param { string } username
 */
const starredRepos = async (username) => axios.get(`${API}/${username}/starred?types=owner`)

module.exports = {
  starredRepos,
  infoUser
}
