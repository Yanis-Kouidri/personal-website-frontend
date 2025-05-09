import { BasicH2Title, BasicWrapper } from '../../utils/style/CommonStyles'
import DocsList from '../../components/docs/DocsList'
import { useState } from 'react'

function Docs() {
  const [triggerFetch, setTriggerFetch] = useState(0)

  return (
    <BasicWrapper>
      <BasicH2Title>Mes documents</BasicH2Title>
      <DocsList triggerFetch={triggerFetch} setTriggerFetch={setTriggerFetch} />
    </BasicWrapper>
  )
}

export default Docs
