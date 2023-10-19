import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa"
import "./FooterLinks.scss"
import logoImg from "../../assets/shopito_logo.png"


const FooterLinks = () => {
  return (
    <>
    <section className="contact-section">
        <div className="container contact">
            <div className="contact-icon">
                <FaFacebook className="i" />
                <FaTwitter className="i" />
                <FaInstagram className="i" />
                <FaWhatsapp className="i" />
            </div>
            <h2>¿Hablemos?</h2>
            <a href="#home" className="btn btn-dark">!realiza una consulta!</a>
        </div>
    </section>

    <section className="footer-section">
        <div className="container footer">
            <div className="footer-logo">
                <img src={logoImg} alt="" />
            </div>
            <div className="footer-menu">
                <p className="link-heading">
                    Caracteristicas
                </p>
                <ul className="nav-ul footer-links">
                    <li>
                        <a href="">acortamiento de enlaces</a>
                    </li>
                    <li>
                        <a href="">enlaces de marca</a>
                    </li>
                    <li>
                        <a href="">Analitica</a>
                    </li>
                    <li>
                        <a href="">Blogs</a>
                    </li>
                </ul>
            </div>
            <div className="footer-menu">
                <p className="link-heading">
                    Socios
                </p>
                <ul className="nav-ul footer-links">
                    <li>
                        <a href="">Acerca de</a>
                    </li>
                    <li>
                        <a href="">Nuestro equipo</a>
                    </li>
                    <li>
                        <a href="">Carrera</a>
                    </li>
                    <li>
                        <a href="">contactos</a>
                    </li>
                </ul>
            </div>
            <div className="footer-menu">
                <p className="link-heading">
                    Recursos
                </p>
                <ul className="nav-ul footer-links">
                    <li>
                        <a href="">acortamiento de enlaces</a>
                    </li>
                    <li>
                        <a href="">enlaces de marca</a>
                    </li>
                    <li>
                        <a href="">Analitica</a>
                    </li>
                    <li>
                        <a href="">Blogs</a>
                    </li>
                </ul>
            </div>
            <div className="footer-menu">
                <p className="link-heading">
                    Caracteristicas
                </p>
                <ul className="nav-ul footer-links">
                    <li>
                        <a href="">acortamiento de enlaces</a>
                    </li>
                    <li>
                        <a href="">enlaces de marca</a>
                    </li>
                    <li>
                        <a href="">Analitica</a>
                    </li>
                    <li>
                        <a href="">Blogs</a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
    </>
  )
}

export default FooterLinks
