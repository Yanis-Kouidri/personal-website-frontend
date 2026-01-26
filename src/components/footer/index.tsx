import { useUIContent } from '../../context/UIContentProvider'
import { StyledParagraph } from '../../utils/style/CommonStyles'
import { FooterWrapper } from './index.style'

function Footer() {
  const currentYear = new Date().getFullYear()

  const { footerData, loading, error } = useUIContent()

  if (loading) {
    return <StyledParagraph>Loading...</StyledParagraph>
  }

  if (error) {
    return <StyledParagraph>Error: {error}</StyledParagraph>
  }

  const footerDescription = footerData?.description || ''
  const acknowledgments = footerData?.acknowledgments || ''

  return (
    <FooterWrapper>
      <StyledParagraph>&copy; {currentYear} Yanis Kouidri</StyledParagraph>
      <StyledParagraph>
        {footerDescription}
        <br />
        {acknowledgments}
      </StyledParagraph>
    </FooterWrapper>
  )
}

export default Footer
