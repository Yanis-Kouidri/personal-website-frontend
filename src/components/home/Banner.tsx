import {
  BannerWrapper,
  PresentationPicture,
  StyledTitle,
  StyledTextPart,
} from './Banner.styles'
import type { BannerProps } from '../../pages/home'
import yanis from '../../assets/pictures/photo_accueil_yanis.webp'

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
      <PresentationPicture
        src={yanis}
        alt="Yanis Kouidri"
        fetchPriority="high"
      />
    </BannerWrapper>
  )
}

export default Banner
