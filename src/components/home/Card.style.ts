import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const SkillCardStyled = styled.div`
  padding: 0px 35px 10px 30px;
  width: 120px;
  height: 200px;
  text-align: center;
  cursor: pointer;
`

export const LogoContainer = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LogoStyled = styled.img<LogoStyledProps>`
  max-height: ${(props) => props.size}px;
  max-width: ${(props) => props.size}px;
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.2);
  }
`

export const NameStyled = styled.h3`
  font-size: 20px;
  font-weight: 300;
`

export const LinkStyled = styled(Link)`
  text-decoration: none;
  color: inherit;
`

export const ExternalLinkStyled = styled.a`
  text-decoration: none;
  color: inherit;
`

interface LogoStyledProps {
  size: number
}
