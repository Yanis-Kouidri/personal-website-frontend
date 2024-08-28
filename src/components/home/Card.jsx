import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const SkillCardStyled = styled.div`
  padding: 0px 35px 10px 30px;
  width: 120px;
  height: 200px;
  text-align: center;
  cursor: pointer;
`

const LogoContainer = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LogoStyled = styled.img`
  max-height: ${(props) => props.size}px;
  max-width: ${(props) => props.size}px;
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.2);
  }
`

const NameStyled = styled.h3`
  font-size: 20px;
  font-weight: 300;
`

const LinkStyled = styled.a`
  text-decoration: none;
  color: inherit;
`

function Card({ name, logo, link, size }) {
  return (
    <LinkStyled href={link} target="_blank" rel="noopener noreferrer">
      <SkillCardStyled>
        <LogoContainer>
          <LogoStyled src={logo} alt="" size={size} />
        </LogoContainer>
        <NameStyled>{name}</NameStyled>
      </SkillCardStyled>
    </LinkStyled>
  )
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
}

export default Card
