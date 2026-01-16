import {
  ExternalLinkStyled,
  LogoContainer,
  LogoStyled,
  NameStyled,
  SkillCardStyled,
} from './Card.style'

interface CardProps {
  name: string
  logo: string
  link: string
  size: number
}

function Card({ name, logo, link, size }: CardProps) {
  return (
    <ExternalLinkStyled href={link} target="_blank" rel="noopener noreferrer">
      <SkillCardStyled>
        <LogoContainer>
          <LogoStyled src={logo} alt="" size={size} />
        </LogoContainer>
        <NameStyled>{name}</NameStyled>
      </SkillCardStyled>
    </ExternalLinkStyled>
  )
}

export default Card
