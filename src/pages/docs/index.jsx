import { BasicH2Title, BasicWrapper } from "../../utils/style/CommonStyles"
import DocsList from "../../components/docs/DocsList"
import DocsUpload from "../../components/docs/DocsUpload"

function Docs() {
  return (
    <BasicWrapper>
      <BasicH2Title>Mes documentations</BasicH2Title>
      <DocsUpload />
      <DocsList />
    </BasicWrapper>
  )
}

export default Docs
