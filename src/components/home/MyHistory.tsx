import route from '../../assets/decorations/route.webp'
import stairs from '../../assets/decorations/stairs.webp'
import {
  MyHistoryWrapper,
  StyledTitle,
  StyledParagraph,
  StyledStairs,
  StyledRoute,
} from './MyHistory.style'

function MyHistory() {
  const title = 'Mon parcours'

  const runningYears = new Date().getFullYear()
  const myAge =
    new Date() > new Date(runningYears, 10, 18)
      ? runningYears - 2002
      : runningYears - 2002 - 1

  const myHistoryP1 = `Je m'appelle Yanis Kouidri et j'ai ${myAge} ans. Au collège puis au lycée, je commence à m'intéresser à l'informatique. J'apprends les bases de Linux en travaillant sur un serveur Minecraft que j'administre.`
  const myHistoryP2 = `Après avoir obtenu le baccalauréat, je m'oriente vers un DUT Réseaux et Télécommunications pour poursuivre mon apprentissage dans l'informatique. C'est à ce moment-là que j'apprends à programmer, à administrer un réseau, à créer des serveurs et à comprendre comment fonctionne Internet.`
  const myHistoryP3 = `À la fin de mon DUT, je poursuis mes études à l'ENSEEIHT, une grande école d'ingénieurs à Toulouse, dans la filière Sciences du Numérique. J'effectue mes 3 années à l'ENSEEIHT en alternance avec Thales Alenia Space.`
  const myHistoryP4 = `Actuellement en dernière année de mon parcours d'ingénieur, je suis en train d'effectuer un semestre d'échange à l'université de Tor Vergata à Rome. Ces 4 dernières années d'étude et d'apprentissage m'ont permis d'en apprendre plus sur ce que je veux et sur ce que je ne veux pas faire, c'est pourquoi je compte commencer une thèse sur la thématique des réseaux informatiques une fois mon diplôme obtenu.`

  return (
    <MyHistoryWrapper>
      <div>
        <StyledTitle>{title}</StyledTitle>
        <StyledParagraph>{myHistoryP1}</StyledParagraph>
        <StyledParagraph>{myHistoryP2}</StyledParagraph>
        <StyledParagraph>{myHistoryP3}</StyledParagraph>
        <StyledParagraph>{myHistoryP4}</StyledParagraph>
        <StyledStairs src={stairs} alt="" />
      </div>
      <StyledRoute src={route} alt="" />
    </MyHistoryWrapper>
  )
}

export default MyHistory
