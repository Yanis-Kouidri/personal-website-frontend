import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const SkillCardStyled = styled.div`
  padding: 20px;
  width: 120px;
  text-align: center;
  cursor: pointer;
`

const LogoStyled = styled.img`
  height: 100px;
`

const NameStyled = styled.h3`
  font-size: 32px;
`

function SkillCard({ name, logo, link }) {
  const handleClick = () => {
    window.open(link, "_blank")
  }

  return (
    <SkillCardStyled onClick={handleClick}>
      <LogoStyled src={logo} alt="" />
      <NameStyled>{name}</NameStyled>
    </SkillCardStyled>
  )
}

SkillCard.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}

export default SkillCard
