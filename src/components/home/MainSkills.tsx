import dots from '../../assets/decorations/dots.webp'
import stars from '../../assets/decorations/stars.webp'
import waves from '../../assets/decorations/waves.webp'
import type { HomeData } from '../../services/home.service'
import {
  DivTitle,
  ITDiv,
  MainSkillsWrapper,
  NetworkDiv,
  NetworkTextPart,
  StyledDecoration,
  StyledDotsIT,
  StyledDotsNetwork,
  StyledStarsIT,
} from './MainSkills.style'

function MainSkills({
  itTitle,
  itDescription,
  networkTitle,
  networkDescription,
}: HomeData['mainSkills']) {
  /*const itTitle = 'Informatique'
  const itTextPart =
    'Programmation, administration système, sécurité informatique, développement web, développement mobile, développement logiciel, cryptographie, mes compétences en informatique sont variées et me permettent de concevoir et créer des projets de A à Z dans ces nombreux domaines.'

  const networkTitle = 'Réseau'
  const networkTextPart =
    'Réseaux locaux (LAN), réseaux étendus (WAN), réseaux sans fil, réseaux mobiles, protocoles de routage, protocoles de transport (TCP), protocoles de niveau application (HTTP, DNS, SMTP), toutes ces compétences me permettent de comprendre comment un si grand ensemble de machines, différentes et communiquant de manière différente, peuvent communiquer entre elles à travers Internet.'
  */
  return (
    <MainSkillsWrapper>
      <ITDiv>
        <DivTitle>{itTitle}</DivTitle>
        <div>
          <p>{itDescription}</p>
        </div>
        <StyledDotsIT src={dots} alt="" />
        <StyledStarsIT src={stars} alt="" />
      </ITDiv>
      <NetworkDiv>
        <StyledDecoration src={waves} alt="" />
        <StyledDotsNetwork src={dots} alt="" />
        <NetworkTextPart>
          <DivTitle>{networkTitle}</DivTitle>
          <div>
            <p>{networkDescription}</p>
          </div>
        </NetworkTextPart>
      </NetworkDiv>
    </MainSkillsWrapper>
  )
}

export default MainSkills
