import React from "react"
import PropTypes from "prop-types"

function SkillCard({ name, logo, link }) {
  return <p>{name}</p>
}

SkillCard.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}

export default SkillCard
