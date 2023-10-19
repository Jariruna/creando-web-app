import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "./Header.module.scss";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { RESET_AUTH, logout } from "../../redux/features/auth/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/HiddenLink";
import { UserName } from "../../pages/profile/Profile";


export const logo = (
  <div className={styled.logo}>
    <Link to="/">
      <h2>
        NS<span>filtros</span>.
      </h2>
    </Link>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? `${styled.active}` : "");

const Header = () => {

    const [showMenu, setShowMenu] = useState(false);
    const [scrollPage, setScrollPage] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fixNavbar = ()=> {
      if(window.scrollY > 50){
        setScrollPage(true)
      }else {
        setScrollPage(false)
      }
    };
    window.addEventListener("scroll", fixNavbar)

    const toggleMenu = () =>{
        setShowMenu(!showMenu)
    };

    const hideMenu = () =>{
        setShowMenu(false)
    };

    const logoutUser = async () => {
      await dispatch(logout());
      await dispatch(RESET_AUTH());
      navigate("/login")
    };

  const cart = (
    <span className={styled.cart}>
      <Link to="/cart">
        Cart
        <FaShoppingCart size={20} />
        <p>0</p>
      </Link>
    </span>
  );

  return (
    <header className={scrollPage ? `${styled.fixed}` : null}>
      <div className={styled.header}>
        {logo}
        <nav className={showMenu ? `${styled["show-nav"]}`: `${styled["hide-nav"]}`}>

            <div className={showMenu ? `${styled["nav-wrapper"]} ${styled["show-nav-wrapper"]}`: `${styled["nav-wrapper"]}`} onClick={hideMenu}>

            </div>

          <ul>
            <li className={styled["logo-mobile"]}>
                {logo}
                <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>
            <li>
            <ShowOnLogout>
              <NavLink to="/shop" className={activeLink}>
                Tienda
              </NavLink>
              </ShowOnLogout>
              
            </li>
            <li>
            <ShowOnLogin>
            <NavLink to="/admin" className={activeLink}>
                Admin
              </NavLink>
              </ShowOnLogin>
            </li>
          </ul>
          <div className={styled["header-right"]}>
            <span className={styled.links}>
            <ShowOnLogin>
              <NavLink to={"login"} className={activeLink}>
                <FaUserCircle size={16} color="#ff7722" />
                <UserName/>
              </NavLink>
              </ShowOnLogin>
              <ShowOnLogout>
              <NavLink to={"login"} className={activeLink}>
                Inicie Sesion
              </NavLink>
              </ShowOnLogout>
              <ShowOnLogout>
              <NavLink to={"register"} className={activeLink}>
                registrese
              </NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
              <NavLink to={"order-history"} className={activeLink}>
                Mi pedido
              </NavLink>
              </ShowOnLogin>
              <ShowOnLogin>
              <Link to={"/"} onClick={logoutUser}>
                cerrar sesion
              </Link>
              </ShowOnLogin>
            </span>
            {cart}
          </div>
        </nav>
        <div className={styled["menu-icon"]}>
            {cart}
            <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
