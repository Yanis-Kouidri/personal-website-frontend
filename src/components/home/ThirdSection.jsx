import React from "react"
import styled from "styled-components"
import colors from "../../utils/style/colors"
import route from "../../assets/decorations/route.png"
import stairs from "../../assets/decorations/stairs.png"

const ThirdSectionWrapper = styled.section`
  min-height: 500px;
  background-color: ${colors.fourth};
  padding: 150px;
  display: flex;
`

const StyledTitle = styled.h2`
  color: ${colors.fith};
  font-size: 42px;
`

const StyledParagraph = styled.p`
  color: white;
`

const StyledStairs = styled.img`
  height: 80px;
  padding: 150px 0px 0px 0px;
`

const StyledRoute = styled.img`
  padding: 0px 50px 0px 50px;
`

function ThirdSection() {
  const title = "Mon parcours"
  const myHistory =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus laoreet erat id augue ultricies, in elementum dui dapibus. Vivamus hendrerit gravida iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac risus eget enim porta ultrices a a magna. Maecenas et metus a lectus mollis aliquet vitae at mi."

  return (
    <ThirdSectionWrapper>
      <div>
        <StyledTitle>{title}</StyledTitle>
        <StyledParagraph>{myHistory}</StyledParagraph>
        <StyledStairs src={stairs} alt="" />
      </div>
      <StyledRoute src={route} alt="" />
    </ThirdSectionWrapper>
  )
}

export default ThirdSection
