import {
  ExternalLinkStyled,
  LinkStyled,
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
  isExternal?: boolean
}

function Card({ name, logo, link, size, isExternal = false }: CardProps) {
  return isExternal ? (
    <ExternalLinkStyled href={link} target="_blank" rel="noopener noreferrer">
      <SkillCardStyled>
        <LogoContainer>
          <LogoStyled src={logo} alt="" size={size} />
        </LogoContainer>
        <NameStyled>{name}</NameStyled>
      </SkillCardStyled>
    </ExternalLinkStyled>
  ) : (
    <LinkStyled to={link}>
      <SkillCardStyled>
        <LogoContainer>
          <LogoStyled src={logo} alt="" size={size} />
        </LogoContainer>
        <NameStyled>{name}</NameStyled>
      </SkillCardStyled>
    </LinkStyled>
  )
}

export default Card
