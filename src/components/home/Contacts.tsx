import contacts from '../../data/home/contacts'
import type { HomeData } from '../../services/home.service'
import Card from './Card'
import { ContactListWrapper, ContactWrapper, Title } from './Contacts.style'

function Contacts({ title }: Readonly<HomeData['contact']>) {
  const contactCardSize = 50

  return (
    <ContactWrapper>
      <Title>{title}</Title>
      <ContactListWrapper>
        {contacts.map((contact) => (
          <Card
            key={contact.name}
            name={contact.name}
            logo={contact.logo}
            link={contact.link}
            size={contactCardSize}
          />
        ))}
      </ContactListWrapper>
    </ContactWrapper>
  )
}

export default Contacts
