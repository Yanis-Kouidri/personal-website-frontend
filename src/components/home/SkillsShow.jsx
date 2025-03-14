import React, { useState } from 'react'
import styled from 'styled-components'
import Card from './Card'
import skills from '../../data/home/skills'

const SkillsShowWrapper = styled.section``

const StyledTitle = styled.h2`
  font-size: 42px;
  text-align: center;
`

const SkillsSetList = styled.div`
  text-align: center;
`

const SkillSection = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  margin: 8px;
  border-radius: 8px;
  width: 180px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? 'white' : 'transparent')};
  box-shadow: ${(props) =>
    props.selected ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none'};
`

const SkillsPart = styled.div`
  display: flex;
  justify-content: center;
`

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 925px;
  min-height: 600px;
  background-color: white;
  border-radius: 25px;
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-bottom: 70px;
`

function SkillsShow() {
  const title = 'Mes compétences'

  const [selectedSkillsSet, setSelectedSkillsSet] = useState(
    Object.keys(skills)[0],
  )

  const handleSkillClick = (skill) => {
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
