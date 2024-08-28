import React from "react"
import styled from "styled-components"
import colors from "../../utils/style/colors"
import dots from "../../assets/decorations/dots.png"
import stars from "../../assets/decorations/stars.png"
import waves from "../../assets/decorations/waves.png"

const MainSkillsWrapper = styled.section`
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

function MainSkills() {
  const itTitle = "Informatique"
  const itTextPart =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus laoreet erat id augue ultricies, in elementum dui dapibus. Vivamus hendrerit gravida iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac risus eget enim porta ultrices a a magna. Maecenas et metus a lectus mollis aliquet vitae at mi."

  const networkTitle = "Réseau"
  const networkTextPart =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus laoreet erat id augue ultricies, in elementum dui dapibus. Vivamus hendrerit gravida iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac risus eget enim porta ultrices a a magna. Maecenas et metus a lectus mollis aliquet vitae at mi."

  return (
    <MainSkillsWrapper>
      <ITDiv>
        <DivTitle>{itTitle}</DivTitle>
        <div>
          <p>{itTextPart}</p>
        </div>
        <StyledDotsIT src={dots} alt="" />
        <StyledStarsIT src={stars} alt="" />
      </ITDiv>
      <NetworkDiv>
        <StyledDecoration src={waves} alt="" />
        <StyledDotsNetwork src={dots} alt="" />
        <NetworkTextPart>
          <DivTitle>{networkTitle}</DivTitle>
          <div>
            <p>{networkTextPart}</p>
          </div>
        </NetworkTextPart>
      </NetworkDiv>
    </MainSkillsWrapper>
  )
}

export default MainSkills
