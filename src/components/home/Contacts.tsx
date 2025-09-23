import styled from 'styled-components'
import Card from './Card'
import contacts from '../../data/home/contacts'

const ContactWrapper = styled.div`
  background-color: #dadada;
`

const Title = styled.h2`
  text-align: center;
  font-size: 34px;
  padding: 50px 0px 20px 0px;
`

const ContactListWrapper = styled.div`
  display: flex;
  justify-content: center;
`

function Contacts() {
  const contactCardSize = 50

  return (
    <ContactWrapper>
      <Title>Contactez moi</Title>
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
