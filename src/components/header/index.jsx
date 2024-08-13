import { Link } from "react-router-dom"

function Header() {
  return (
    <nav>
      <Link to="/">Accueil</Link>
      <Link to="/projects">Projets</Link>
      <Link to="/docs">Documentations</Link>
      <Link to="/about">À propos</Link>
    </nav>
  )
}

export default Header
