import styled from 'styled-components'
import colors from '../../utils/style/colors'

export const MainSkillsWrapper = styled.section`
  display: flex;
  text-align: justify;
`

export const ITDiv = styled.div`
  padding: 50px 100px 50px 150px;
`

export const NetworkDiv = styled.div`
  padding: 80px 150px 100px 50px;
`

export const NetworkTextPart = styled.div`
  padding-top: 150px;
`

export const DivTitle = styled.h2`
  font-size: 42px;
  color: ${colors.fourth};
`

export const StyledDecoration = styled.img`
  height: 60px;
`

export const StyledDotsIT = styled(StyledDecoration)`
  padding-top: 20%;
  padding-left: 30px;
`

export const StyledDotsNetwork = styled(StyledDecoration)`
  padding-right: 50px;
  float: right;
`

export const StyledStarsIT = styled(StyledDecoration)`
  float: right;
  padding-top: 150px;
`
