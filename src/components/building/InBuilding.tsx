import {
  InBuildingImg,
  InBuildingWrapper,
} from '../../utils/style/CommonStyles'
import chantier from '../../assets/illustrations/chantier.png'

function InBuilding() {
  return (
    <InBuildingWrapper>
      <InBuildingImg src={chantier} alt="" />
      <p>
        Cette page est en construction, revenez plus tard pour en savoir plus
        sur moi.
      </p>
    </InBuildingWrapper>
  )
}
export default InBuilding
