import styled from 'styled-components'
import colors from '../../utils/style/colors'
import yanis from '../../assets/pictures/photo_accueil_yanis.webp'

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
  margin: auto;
`

const StyledTextPart = styled.div``

interface BannerProps {
  title: string
  shortDescription: string
  location: string
}

function Banner({ title, shortDescription, location }: BannerProps) {
  //const shortDescription: string =
  //  "Ingénieur en informatique et réseaux à l'ENSEEIHT."
  //const location: string = '🌆 Toulouse, France.'

  return (
    <BannerWrapper>
      <StyledTextPart>
        <StyledTitle>{title}</StyledTitle>
        <p>{shortDescription}</p>
        <p>{location}</p>
      </StyledTextPart>
      <PresentationPicutre
        src={yanis}
        alt="Yanis Kouidri"
        fetchPriority="high"
      />
    </BannerWrapper>
  )
}

export default Banner
