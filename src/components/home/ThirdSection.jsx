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
  max-height: 400px;
`

function ThirdSection() {
  const title = "Mon parcours"

  const runningYears = new Date().getFullYear()
  const myAge =
    new Date() > new Date(runningYears, 10, 18)
      ? runningYears - 2002
      : runningYears - 2002 - 1
  const myHistory = `Je m'appelle Yanis Kouidri et j'ai ${myAge} ans.`

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
