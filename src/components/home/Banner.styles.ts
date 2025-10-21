// Banner.styles.ts
import styled from 'styled-components'
import colors from '../../utils/style/colors'

export const BannerWrapper = styled.section`
  display: flex;
  justify-content: center;
  background: linear-gradient(
    to right,
    ${colors.sixth} calc(50% + 220px),
    ${colors.fourth} calc(0%)
  );
  padding: 100px;
`

export const PresentationPicture = styled.img`
  height: 300px;
  padding-left: 50px;
`

export const StyledTitle = styled.h1`
  line-height: 50px;
  font-size: 52px;
  margin: auto;
`

export const StyledTextPart = styled.div``
