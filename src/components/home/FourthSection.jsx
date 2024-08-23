import React, { useState } from "react"
import styled from "styled-components"
import SkillCard from "./SkillCard"
import c from "../../assets/skills/programming/C.png"
import java from "../../assets/skills/programming/java.png"
//import colors from "../../utils/style/colors"

const FourthSectionWrapper = styled.section``

const StyledTitle = styled.h2`
  font-size: 42px;
`

const SkillsSetList = styled.div``

const SkillSection = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  margin: 8px;
  border-radius: 8px;
  width: 180px;
`

const SkillsPart = styled.div`
  display: flex;
`

const SkillsList = styled.div`
  display: flex;
`

function FourthSection() {
  const title = "Mes compétences"

  const skills = {
    Programmation: [
      {
        link: "https://en.wikipedia.org/wiki/C_(programming_language)",
        logo: c,
        name: "C",
      },
      {
        link: "https://fr.wikipedia.org/wiki/Java_(langage)",
        logo: java,
        name: "Java",
      },
    ],
    Système: [{}],
    Réseau: [{}],
  }

  const [selectedSkillsSet, setSelectedSkillsSet] = useState(
    Object.keys(skills)[0],
  )

  const handleSkillClick = (skill) => {
    setSelectedSkillsSet(skill)
  }

  return (
    <FourthSectionWrapper>
      <StyledTitle>{title}</StyledTitle>
      <SkillsPart>
        <SkillsSetList>
          {Object.keys(skills).map((skillPart) => (
            <SkillSection
              key={skillPart}
              onClick={() => handleSkillClick(skillPart)}
            >
              {skillPart}
            </SkillSection>
          ))}
        </SkillsSetList>
        <SkillsList>
          {skills[selectedSkillsSet].map((skill) => (
            <SkillCard
              key={skill.name}
              name={skill.name}
              logo={skill.logo}
              link={skill.link}
            />
          ))}
        </SkillsList>
      </SkillsPart>
    </FourthSectionWrapper>
  )
}

export default FourthSection
