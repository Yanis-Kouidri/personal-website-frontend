import React from 'react'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import yanis from '../../assets/pictures/photo_accueil_yanis.jpg'

const BannerWrapper = styled.section`
  display: flex;
  justify-content: center;
  background: linear-gradient(
    to right,
    ${colors.sixth} calc(50% + 220px),
    ${colors.fourth} calc(0%)
  );
  padding: 100px;
`

const PresentationPicutre = styled.img`
  height: 300px;
  padding-left: 50px;
`

const StyledTitle = styled.h1`
  line-height: 50px;
  font-size: 52px;
`

const StyledTextPart = styled.div``

function Banner() {
  const shortDescription = "Ingénieur en informatique et réseaux à l'ENSEEIHT."
  const location = '🌆 Toulouse, France.'

  return (
    <BannerWrapper>
      <StyledTextPart>
        <StyledTitle>Yanis Kouidri</StyledTitle>
        <p>{shortDescription}</p>
        <p>{location}</p>
      </StyledTextPart>
      <PresentationPicutre src={yanis} alt="Yanis Kouidri" />
    </BannerWrapper>
  )
}

export default Banner
