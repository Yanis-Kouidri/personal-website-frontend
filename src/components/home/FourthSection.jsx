import React, { useState } from "react"
import styled from "styled-components"
//import colors from "../../utils/style/colors"

const FourthSectionWrapper = styled.section``

const StyledTitle = styled.h2`
  font-size: 42;
`

const SkillsSetList = styled.div``

const SkillCard = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  margin: 8px;
  border-radius: 8px;
  width: 180px;
`

const SkillsPart = styled.div`
  display: flex;
`

function FourthSection() {
  const title = "Mes compétences"

  const skillPart = ["Programmation", "Système", "Réseau"]

  const [selectedSkillsSet, setSelectedSkillsSet] = useState(skillPart[0])

  const handleSkillClick = (skill) => {
    setSelectedSkillsSet(skill)
  }

  return (
    <FourthSectionWrapper>
      <StyledTitle>{title}</StyledTitle>
      <SkillsPart>
        <SkillsSetList>
          {skillPart.map((skill) => (
            <SkillCard key={skill} onClick={() => handleSkillClick(skill)}>
              {skill}
            </SkillCard>
          ))}
        </SkillsSetList>

        <StyledTitle>Voici mes compétences en {selectedSkillsSet}</StyledTitle>
      </SkillsPart>
    </FourthSectionWrapper>
  )
}

export default FourthSection
