import { BasicH2Title, BasicWrapper } from "../../utils/style/CommonStyles"
import DocsList from "../../components/docs/DocsList"
import DocsUpload from "../../components/docs/DocsUpload"
import { useUser } from "../../context/UserProvider"

function Docs() {
  const { user } = useUser()
  return (
    <BasicWrapper>
      <BasicH2Title>Mes documentations</BasicH2Title>
      {user && <DocsUpload />}
      <DocsList />
    </BasicWrapper>
  )
}

export default Docs
