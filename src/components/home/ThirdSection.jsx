import React from "react"
import styled from "styled-components"
import colors from "../../utils/style/colors"

const ThirdSectionWrapper = styled.section`
  height: 500px;
  background-color: ${colors.fourth};
`

function ThirdSection() {
  return (
    <ThirdSectionWrapper>
      {/* Vous pouvez ajouter du contenu ici */}
    </ThirdSectionWrapper>
  )
}

export default ThirdSection
