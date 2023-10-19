import { FaShippingFast } from "react-icons/fa";
import {
  BsCartCheck,
  BsClockHistory,
  BsFillCreditCardFill,
} from "react-icons/bs";

const data = [
    {
      icon: <FaShippingFast size={30} color="#8cb4f5" />,
      heading: "Envio Gratis",
      text: "Ofrecemos envío gratuito en productos especiales.",
    },
    {
      icon: <BsFillCreditCardFill size={30} color="#f7d272" />,
      heading: "Pago Seguro",
      text: "Realiza el pago seguro de tu producto.",
    },
    {
      icon: <BsCartCheck size={30} color="#fa82ea" />,
      heading: "Mejor Calidad",
      text: "Vendemos productos solo de las marcas.",
    },
    {
      icon: <BsClockHistory size={30} color="#82fa9e" />,
      heading: "Soporte 24/7",
      text: "Obtenga acceso al soporte de nuestro equipo experto.",
    },
  ];

const HomeInfoBox = () => {
  return (
    <div className="infoboxes --mb2">
      {data.map((item, index) => {
        const {icon, heading, text} = item
        return(
            <div className="infobox" key={index}>
                <div className="icon">{icon}</div>
                <div className="text">
                    <h4>{heading}</h4>
                    <p className="--text-sm">{text}</p>
                </div>

            </div>
        )
      })}
    </div>
  )
}

export default HomeInfoBox
