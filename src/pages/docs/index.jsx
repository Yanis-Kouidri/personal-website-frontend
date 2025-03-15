import { BasicH2Title, BasicWrapper } from '../../utils/style/CommonStyles'
import DocsList from '../../components/docs/DocsList'
import DocsUpload from '../../components/docs/DocsUpload'
import { useUser } from '../../context/contexts'
import { useState } from 'react'
import AddFolders from '../../components/docs/AddFolders'

function Docs() {
  const { user } = useUser()
  const [triggerFetch, setTriggerFetch] = useState(0)

  return (
    <BasicWrapper>
      <BasicH2Title>Mes documentations</BasicH2Title>
      {user && <DocsUpload setTriggerFetch={setTriggerFetch} />}
      <br />
      {user && <AddFolders setTriggerFetch={setTriggerFetch} />}
      <DocsList triggerFetch={triggerFetch} />
    </BasicWrapper>
  )
}

export default Docs
