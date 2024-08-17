import yanis from "../../assets/pictures/photo_accueil_yanis.jpg"
import styled from "styled-components"

const FirstSection = styled.section`
  display: flex;
  justify-content: center;
`

const PresentationPicutre = styled.img`
  height: 300px;
  padding-left: 50px;
`

const StyledTitle = styled.h1`
  line-height: 50px;
  font-size: 32px;
`

function Home() {
  const shortDescription = "Ingénieur en informatique à l'ENSEEIHT"

  return (
    <FirstSection>
      <div>
        <StyledTitle>Yanis Kouidri</StyledTitle>
        <p>{shortDescription}</p>
      </div>
      <PresentationPicutre src={yanis} alt="Yanis Kouidri" />
    </FirstSection>
  )
}

export default Home
