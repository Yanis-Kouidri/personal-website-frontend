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
    "Programmation, administration système, sécurité informatique, développement web, développement mobile, développement logiciel, cryptographie, mes compétences en informatique sont variées et me permettent de concevoir et créer des projets de A à Z dans ces nombreux domaines."

  const networkTitle = "Réseau"
  const networkTextPart =
    "Réseaux locaux (LAN), réseaux étendus (WAN), réseaux sans fil, réseaux mobiles, protocoles de routage, protocoles de transport (TCP), protocoles de niveau application (HTTP, DNS, SMTP), toutes ces compétences me permettent de comprendre comment un si grand ensemble de machines, différentes et communiquant de manière différente, peuvent communiquer entre elles à travers Internet."

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
