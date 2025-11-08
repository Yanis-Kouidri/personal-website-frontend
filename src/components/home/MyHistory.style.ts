import styled from 'styled-components'
import colors from '../../utils/style/colors'

export const MyHistoryWrapper = styled.section`
  min-height: 300px;
  background-color: ${colors.fourth};
  padding: 150px 150px 50px 150px;
  display: flex;
  justify-content: space-between;
`

export const StyledTitle = styled.h2`
  color: ${colors.fifth};
  font-size: 42px;
`

export const StyledParagraph = styled.p`
  color: white;
  max-width: 900px;
`

export const StyledStairs = styled.img`
  height: 80px;
  padding: 70px 0px 0px 0px;
  margin: 0px;
`

export const StyledRoute = styled.img`
  padding: 0px 50px 0px 50px;
  max-height: 500px;
`
