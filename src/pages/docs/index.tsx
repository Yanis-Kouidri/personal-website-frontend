import DocsList from '../../components/docs/DocsList'
import { BasicH2Title, BasicWrapper } from '../../utils/style/CommonStyles'

function Docs() {
  return (
    <BasicWrapper>
      <BasicH2Title>Mes documents</BasicH2Title>
      <DocsList />
    </BasicWrapper>
  )
}

export default Docs
