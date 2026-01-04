import chantier from '../../assets/illustrations/chantier.webp'
import {
  InBuildingImg,
  InBuildingWrapper,
} from '../../utils/style/CommonStyles'

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
