import React from "react"
import styled from "styled-components"
import colors from "../../utils/style/colors"
import route from "../../assets/decorations/route.png"
import stairs from "../../assets/decorations/stairs.png"

const MyHistoryWrapper = styled.section`
  min-height: 300px;
  background-color: ${colors.fourth};
  padding: 150px 150px 50px 150px;
  display: flex;
  justify-content: space-between;
`

const StyledTitle = styled.h2`
  color: ${colors.fith};
  font-size: 42px;
`

const StyledParagraph = styled.p`
  color: white;
  max-width: 900px;
`

const StyledStairs = styled.img`
  height: 80px;
  padding: 70px 0px 0px 0px;
  margin: 0px;
`

const StyledRoute = styled.img`
  padding: 0px 50px 0px 50px;
  max-height: 500px;
`

function MyHistory() {
  const title = "Mon parcours"

  const runningYears = new Date().getFullYear()
  const myAge =
    new Date() > new Date(runningYears, 10, 18)
      ? runningYears - 2002
      : runningYears - 2002 - 1

  const myHistoryP1 = `Je m'appelle Yanis Kouidri et j'ai ${myAge} ans. Au collège puis au lycée, je commence à m'intéresser à l'informatique. J'apprends les bases de Linux en travaillant sur un serveur Minecraft que j'administre.`
  const myHistoryP2 = `Après avoir obtenu le baccalauréat, je m'oriente vers un DUT Réseaux et Télécommunications pour poursuivre mon apprentissage dans l'informatique. C'est à ce moment-là que j'apprends à programmer, à administrer un réseau, à créer des serveurs et à comprendre comment fonctionne Internet.`
  const myHistoryP3 = `À la fin de mon DUT, je poursuis mes études à l'ENSEEIHT, une grande école d'ingénieurs à Toulouse, dans la filière Sciences du Numérique. J'effectue mes 3 années à l'ENSEEIHT en alternance avec Thales Alenia Space.`
  const myHistoryP4 = `Actuellement en dernière année de mon parcours d'ingénieur, je suis en train d'effectuer un semestre d'échange à l'université de Tor Vergata à Rome. C'est 4 dernières années d'étude et d'apprentissage m'ont permises de plus en aprendre sur ce que veux et sur ce que je ne veux pas faire, c'est pourquoi je compte commencer une thèse sur la thématique des réseaux informatique une fois mon diplome obtenu.`

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
