/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import"./Corousel.scss";
import { shortenText } from "../../utils";


const CorouselItem = ({url, name, price, description}) => {
  return (
    <div className="carouselItem">
      <Link to="/product-details">
        <img className="product--image" src={url} alt="product" />
        <p className="price">
            {`S/${price}`}
        </p>
        <h4>{shortenText(name, 18)}</h4>
        <p className="--mb">{shortenText(description, 26)}</p>
      </Link>
      <button className="--btn --btn-primary --btn-block">Agregar al Carrito</button>
    </div>
  )
}

export default CorouselItem
