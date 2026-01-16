import yanis from '../../assets/pictures/photo_accueil_yanis.webp'
import type { HomeData } from '../../services/home.service'
import {
  BannerWrapper,
  PresentationPicture,
  StyledTextPart,
  StyledTitle,
} from './Banner.styles'

function Banner({
  title,
  shortDescription,
  location,
}: Readonly<HomeData['banner']>) {
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
