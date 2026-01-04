import cv from '../../assets/contacts/cv.svg'
import email from '../../assets/contacts/email.svg'
import github from '../../assets/contacts/github.svg'
import key from '../../assets/contacts/key.svg'
import linkedin from '../../assets/contacts/linkedin.svg'

const contacts = [
  {
    link: 'https://www.linkedin.com/in/yanis-kouidri',
    logo: linkedin,
    name: 'Linkedin',
  },
  {
    link: 'https://github.com/Yanis-Kouidri',
    logo: github,
    name: 'Github',
  },
  {
    link: '',
    logo: cv,
    name: 'CV - Français',
  },
  {
    link: '',
    logo: cv,
    name: 'CV - English',
  },
  {
    link: 'mailto:yanis.kouidri@gmail.com',
    logo: email,
    name: 'E-mail',
  },
  {
    link: '/pgp',
    logo: key,
    name: 'PGP Key',
    isExternal: false,
  },
]

export default contacts
