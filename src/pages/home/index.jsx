import yanis from "../../assets/pictures/photo_accueil_yanis.jpg"
import stars from "../../assets/decorations/stars.png"
import waves from "../../assets/decorations/waves.png"
import dots from "../../assets/decorations/dots.png"
import styled from "styled-components"
import colors from "../../utils/style/colors"

const FirstSection = styled.section`
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

const SecondSection = styled.section`
  display: flex;
  text-align: justify;
`
const ITDiv = styled.div`
  padding: 50px 100px 50px 150px;
`
const NetworkDiv = styled.div`
  padding: 80px 150px 100px 50px;
`

const NetworkTextPart = styled.div`
  padding-top: 150px;
`
const DivTitle = styled.h2`
  font-size: 42px;
  color: ${colors.fourth};
`

const StyledDecoration = styled.img`
  height: 60px;
`

const StyledDotsIT = styled(StyledDecoration)`
  padding-top: 20%;
  padding-left: 30px;
`

const StyledDotsNetwork = styled(StyledDecoration)`
  padding-right: 50px;
  float: right;
`

const StyledStarsIT = styled(StyledDecoration)`
  float: right;
  padding-top: 150px;
`

function Home() {
  const shortDescription = "Ingénieur en informatique et réseaux à l'ENSEEIHT."
  const location = "🌆 Toulouse, France."

  const itTitle = "Informatique"
  const itTextPart =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus laoreet erat id augue ultricies, in elementum dui dapibus. Vivamus hendrerit gravida iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac risus eget enim porta ultrices a a magna. Maecenas et metus a lectus mollis aliquet vitae at mi."

  const networkTitle = "Réseau"
  const networkTextPart =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus laoreet erat id augue ultricies, in elementum dui dapibus. Vivamus hendrerit gravida iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac risus eget enim porta ultrices a a magna. Maecenas et metus a lectus mollis aliquet vitae at mi."

  return (
    <>
      <FirstSection>
        <StyledTextPart>
          <StyledTitle>Yanis Kouidri</StyledTitle>
          <p>{shortDescription}</p>
          <p>{location}</p>
        </StyledTextPart>
        <PresentationPicutre src={yanis} alt="Yanis Kouidri" />
      </FirstSection>
      <SecondSection>
        <ITDiv>
          <DivTitle>{itTitle}</DivTitle>
          <StyledTextPart>{itTextPart}</StyledTextPart>
          <StyledDotsIT src={dots} alt="" />
          <StyledStarsIT src={stars} alt="" />
        </ITDiv>
        <NetworkDiv>
          <StyledDecoration src={waves} alt="" />
          <StyledDotsNetwork src={dots} alt="" />
          <NetworkTextPart>
            <DivTitle>{networkTitle}</DivTitle>
            <StyledTextPart>{networkTextPart}</StyledTextPart>
          </NetworkTextPart>
        </NetworkDiv>
      </SecondSection>
    </>
  )
}

export default Home
