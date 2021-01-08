const { repos, starredRepos } = require('../../../services/github.service')
const { username } = require('../../../../config')

const watchButtons = () => {
  const repo = document.querySelector('.show__repo')
  const starred = document.querySelector('.show__starred')
  repo.addEventListener('click', () => showRepositories(username))
  starred.addEventListener('click', () => showStarred(username))
}

const showRepositories = async (username) => {
  return new Promise(async (resolve, reject) => {
    addLoading()
    try {
      const { data } = await repos(username)
      addItemsToTable(data)
      resolve(data)
    } catch (err) {
      console.error(err)
      reject(err)
    } finally {
      addLoading()
    }
  })
}

const showStarred = async (username) => {
  return new Promise(async (resolve, reject) => {
    addLoading()
    try {
      const { data } = await starredRepos(username)
      addItemsToTable(data)
      resolve(data)
    } catch (err) {
      console.error(err)
      reject(err)
    } finally {
      addLoading()
    }
  })
}

const addItemsToTable = (repositorios) => {
  makeElementVisible()
  const reposName = repositorios.map(({ full_name }) => full_name)
  const table = document.querySelector('.repo__list')
  clearBeforeAdd(reposName)
  reposName.map((name) => {
    let row = table.insertRow(0)
    let cell = row.insertCell(0)
    cell.innerHTML = name
  })
}

const clearBeforeAdd = (reposName) => {
  const allTrTable = [...document.querySelectorAll('.repo__list tr')]
  const elTable = document.querySelector('.repo__list')
  if (!allTrTable.length) return
  reposName.map(x => elTable.deleteRow(0))
}

export const addLoading = () => {
  const card = document.querySelector('.challenge__card')
  const iElement = document.querySelector('.challenge__i')
  iElement.classList.toggle('icon-loading')
  iElement.classList.toggle('animate-spin')
  card.classList.toggle('on__loading')
}

const makeElementVisible = () => document.querySelector('.challenge__hidden__menu').classList.add('show__menu')

watchButtons()