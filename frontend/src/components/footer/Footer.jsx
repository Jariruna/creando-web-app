import styled from './Footer.module.scss';

const Footer = () => {
const date = new Date();
const year = date.getFullYear();

  return (
    <div className={styled.footer}>
        &copy; {year} Todos los derechos reservados
    </div>
  )
}

export default Footer
