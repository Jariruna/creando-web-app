import { NavLink } from "react-router-dom"
import "./PageMenu.scss"

const PageMenu = () => {
  return (
    <div>
      <nav className="--bg-primary --p --mb">
        <ul className="home-links">
            <li>
                <NavLink to="/profile">Perfil</NavLink>
            </li>
            <li>
                <NavLink to="/wallet">Mi billetera </NavLink>
            </li>
            <li>
                <NavLink to="wishlist">Lista de deseos</NavLink>
            </li>
        </ul>
      </nav>
    </div>
  )
}

export default PageMenu
