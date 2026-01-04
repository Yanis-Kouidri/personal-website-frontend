import contacts from '../../data/home/contacts'
import type { ContactProps } from '../../pages/home'
import Card from './Card'
import { ContactListWrapper, ContactWrapper, Title } from './Contacts.style'

function Contacts({ title }: ContactProps) {
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
