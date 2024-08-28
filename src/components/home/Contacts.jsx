import React from "react"
import styled from "styled-components"
import ContactCard from "./ContactCard"
import contacts from "../../data/home/contacts"

const ContactWrapper = styled.div``

const Title = styled.h2`
  text-align: center;
`

const ContactListWrapper = styled.div`
  display: flex;
  justify-content: center;
`

function Contacts() {
  return (
    <ContactWrapper>
      <Title>Contactez moi</Title>
      <ContactListWrapper>
        {contacts.map((contact) => (
          <ContactCard
            key={contact.name}
            name={contact.name}
            logo={contact.logo}
            link={contact.link}
          />
        ))}
      </ContactListWrapper>
    </ContactWrapper>
  )
}

export default Contacts
