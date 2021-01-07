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

/**
 * Search public repos of an user
 * @param { string } username 
 */
const repos = async (username) => axios.get(`${API}/${username}/repos`)

module.exports = {
  starredRepos,
  infoUser,
  repos
}
