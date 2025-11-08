import { useState } from 'react'
import Card from './Card'
import skills from '../../data/home/skills'
import {
  SkillsShowWrapper,
  StyledTitle,
  SkillsSetList,
  SkillSection,
  SkillsPart,
  SkillsList,
} from './SkillsShow.style'

function SkillsShow() {
  const title = 'Mes compétences'

  const [selectedSkillsSet, setSelectedSkillsSet] = useState(
    Object.keys(skills)[0],
  )

  const handleSkillClick = (skill: keyof typeof skills) => {
    setSelectedSkillsSet(skill)
  }

  const skillCardSize = 100

  return (
    <SkillsShowWrapper>
      <StyledTitle>{title}</StyledTitle>
      <SkillsPart>
        <SkillsSetList>
          {Object.keys(skills).map((skillPart) => (
            <SkillSection
              key={skillPart}
              onClick={() => handleSkillClick(skillPart)}
              selected={skillPart === selectedSkillsSet}
            >
              {skillPart}
            </SkillSection>
          ))}
        </SkillsSetList>
        <SkillsList>
          {skills[selectedSkillsSet].map((skill) => (
            <Card
              key={skill.name}
              name={skill.name}
              logo={skill.logo}
              link={skill.link}
              size={skillCardSize}
            />
          ))}
        </SkillsList>
      </SkillsPart>
    </SkillsShowWrapper>
  )
}

export default SkillsShow
