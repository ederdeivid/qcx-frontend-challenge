import { github, instagram, linkedin } from '../../../../config'
const baseElement = '.home__social i.icon-'
const names = [
  { icon: 'instagram', profile: instagram, url: 'https://instagram.com' },
  { icon: 'linkedin', profile: linkedin, url: 'https://linkedin.com/in' },
  { icon: 'github', profile: github, url: 'https://github.com' }
]

const openMidiaProfiles = () => {
  names.map(({ icon, profile, url }) => {
    const element = document.querySelector(`${baseElement}${icon}`)
    element.addEventListener('click', () => window.open(`${url}/${profile()}`))
  })
}

openMidiaProfiles()