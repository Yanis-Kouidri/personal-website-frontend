import styled from 'styled-components'

interface SkillSectionProps {
  selected: boolean
}

export const SkillsShowWrapper = styled.section``

export const StyledTitle = styled.h2`
  font-size: 42px;
  text-align: center;
`

export const SkillsSetList = styled.div`
  text-align: center;
`

export const SkillSection = styled.div<SkillSectionProps>`
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

export const SkillsPart = styled.div`
  display: flex;
  justify-content: center;
`

export const SkillsList = styled.div`
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
